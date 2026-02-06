// Prompt generation engine - 8-step Midjourney V7 prompt builder

import type { PromptInput, ProOptions, PromptOutput, PromptSegments } from '@/types/prompt';
import { CAMERA_DB } from '@/lib/database/cameras';
import { LIGHTING_DB } from '@/lib/database/lighting';
import { COLOR_GRADING_DB } from '@/lib/database/colorGrading';
import { CHARACTER_STYLE_DB, CHARACTER_DESC_DB } from '@/lib/database/characters';
import { parseSubject } from '@/lib/engine/subjectParser';
import {
  autoMatchCamera,
  autoMatchShot,
  autoMatchLighting,
  autoMatchColor,
  autoMatchMotion,
  autoMatchAR,
  autoMatchStylize,
  autoMatchNegative,
} from '@/lib/engine/autoMatcher';
import { buildParameters } from '@/lib/engine/parameterBuilder';

/**
 * Generate a complete Midjourney V7 prompt from structured input.
 *
 * 8-step pipeline:
 * 1. Parse subject (Korean → English)
 * 2. Character styling (skip if no_person)
 * 3. Camera selection (pro override or auto-match)
 * 4. Shot/composition (auto-match angle)
 * 5. Lighting (pro override or auto-match)
 * 6. Color grading (pro override or auto-match)
 * 7. Motion (VIDEO/SHORTFORM only)
 * 8. Parameters (build parameter string)
 */
export function generatePrompt(
  input: PromptInput,
  proOptions?: ProOptions
): PromptOutput {
  const { subject, contentType, usageType, characterType, tone, aspectRatio } = input;
  const pro = proOptions ?? input.proOptions;

  // Step 1: Parse subject - translate Korean keywords to English
  const parsedSubject = parseSubject(subject, characterType);

  // Step 2: Character styling
  let characterSegment = '';
  if (characterType !== 'no_person') {
    const characterDesc = CHARACTER_DESC_DB[characterType] ?? '';
    const characterStyle = CHARACTER_STYLE_DB[tone] ?? '';
    if (characterDesc) {
      characterSegment = characterStyle
        ? `${characterDesc}, ${characterStyle}`
        : characterDesc;
    }
  }

  // Step 3: Camera selection
  let cameraSegment = '';
  if (pro?.camera && CAMERA_DB[pro.camera]) {
    const cam = CAMERA_DB[pro.camera];
    cameraSegment = `shot with ${cam.model}, ${cam.lens}, ${cam.style}`;
  } else {
    const cameraKey = autoMatchCamera(parsedSubject, characterType, usageType);
    const cam = CAMERA_DB[cameraKey];
    if (cam) {
      cameraSegment = `shot with ${cam.model}, ${cam.lens}, ${cam.style}`;
    }
  }

  // Step 4: Shot/composition
  const shotSegment = autoMatchShot(characterType, usageType, contentType);

  // Step 5: Lighting
  let lightingSegment = '';
  if (pro?.lighting && LIGHTING_DB[pro.lighting]) {
    lightingSegment = LIGHTING_DB[pro.lighting].prompt;
  } else {
    const lightingKey = autoMatchLighting(tone, usageType, contentType);
    const lighting = LIGHTING_DB[lightingKey];
    if (lighting) {
      lightingSegment = lighting.prompt;
    }
  }

  // Step 6: Color grading
  let colorSegment = '';
  if (pro?.colorGrading && COLOR_GRADING_DB[pro.colorGrading]) {
    colorSegment = COLOR_GRADING_DB[pro.colorGrading].prompt;
  } else {
    const colorKey = autoMatchColor(tone, contentType, usageType);
    const color = COLOR_GRADING_DB[colorKey];
    if (color) {
      colorSegment = color.prompt;
    }
  }

  // Step 7: Motion (VIDEO and SHORTFORM only)
  let motionSegment = '';
  if (contentType === 'VIDEO' || contentType === 'SHORTFORM') {
    if (pro?.motion) {
      motionSegment = pro.motion;
    } else {
      motionSegment = autoMatchMotion(contentType, usageType, parsedSubject);
    }
  }

  // Step 8: Parameters
  const ar = aspectRatio || autoMatchAR(usageType);
  const stylize = pro?.stylize ?? autoMatchStylize(contentType, usageType);
  const chaos = pro?.chaos ?? 0;
  const negative = pro?.negative ?? autoMatchNegative(usageType);
  const version = 7;

  const parametersSegment = buildParameters({
    ar,
    stylize,
    chaos,
    version,
    negative,
    sref: pro?.sref,
    cref: pro?.cref,
    oref: pro?.oref,
  });

  // Build segments object
  const segments: PromptSegments = {
    subject: parsedSubject,
    character: characterSegment,
    camera: cameraSegment,
    shot: shotSegment,
    lighting: lightingSegment,
    color: colorSegment,
    motion: motionSegment,
    parameters: parametersSegment,
  };

  // Combine all non-empty segments into fullPrompt
  const promptParts = [
    segments.subject,
    segments.character,
    segments.camera,
    segments.shot,
    segments.lighting,
    segments.color,
    segments.motion,
  ].filter((part) => part.trim() !== '');

  const descriptivePrompt = promptParts.join(', ');
  const fullPrompt = `${descriptivePrompt} ${segments.parameters}`;

  return {
    fullPrompt,
    segments,
  };
}
