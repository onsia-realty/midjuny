// Prompt generation engine - 10-step Midjourney V7 prompt builder

import type { PromptInput, ProOptions, PromptOutput, PromptSegments } from '@/types/prompt';
import { CAMERA_DB } from '@/lib/database/cameras';
import { LIGHTING_DB } from '@/lib/database/lighting';
import { COLOR_GRADING_DB } from '@/lib/database/colorGrading';
import { CHARACTER_STYLE_DB, CHARACTER_DESC_DB } from '@/lib/database/characters';
import { parseSubjectStructured } from '@/lib/engine/subjectParser';
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
 * 10-step pipeline:
 * 1. Parse subject (Korean → English, structured extraction)
 * 2. Character styling (skip if no_person)
 * 3. Action/activity (what the subject is doing)
 * 4. Background/setting (where the scene takes place)
 * 5. Camera selection (pro override or auto-match)
 * 6. Shot/composition (auto-match angle)
 * 7. Lighting (atmosphere override > pro override > auto-match)
 * 8. Color grading (pro override or auto-match)
 * 9. Motion (VIDEO/SHORTFORM only)
 * 10. Parameters (build parameter string)
 */
export function generatePrompt(
  input: PromptInput,
  proOptions?: ProOptions
): PromptOutput {
  const { subject, contentType, usageType, characterType, tone, aspectRatio } = input;
  const pro = proOptions ?? input.proOptions;

  // Step 1: Parse subject - structured extraction
  const parsed = parseSubjectStructured(subject, characterType);

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

  // Step 3: Action/activity segment
  const actionSegment = parsed.action;

  // Step 4: Background/setting segment
  let backgroundSegment = parsed.background;
  // If no background extracted but we have location hints, add generic background
  if (!backgroundSegment && characterType !== 'no_person') {
    // Add subtle background based on usage type
    if (usageType.includes('real_estate')) {
      backgroundSegment = 'modern real estate office background';
    }
  }

  // Step 5: Camera selection
  let cameraSegment = '';
  if (pro?.camera && CAMERA_DB[pro.camera]) {
    const cam = CAMERA_DB[pro.camera];
    cameraSegment = `shot with ${cam.model}, ${cam.lens}, ${cam.style}`;
  } else {
    const combinedSubject = [parsed.subject, parsed.action, parsed.background].filter(Boolean).join(' ');
    const cameraKey = autoMatchCamera(combinedSubject, characterType, usageType);
    const cam = CAMERA_DB[cameraKey];
    if (cam) {
      cameraSegment = `shot with ${cam.model}, ${cam.lens}, ${cam.style}`;
    }
  }

  // Step 6: Shot/composition
  const shotSegment = autoMatchShot(characterType, usageType, contentType);

  // Step 7: Lighting - atmosphere keywords can override auto-match
  let lightingSegment = '';
  if (parsed.atmosphere) {
    // User specified atmosphere/mood - use it as lighting context
    lightingSegment = `${parsed.atmosphere} lighting atmosphere`;
  }
  if (pro?.lighting && LIGHTING_DB[pro.lighting]) {
    lightingSegment = LIGHTING_DB[pro.lighting].prompt;
  } else if (!parsed.atmosphere) {
    const lightingKey = autoMatchLighting(tone, usageType, contentType);
    const lighting = LIGHTING_DB[lightingKey];
    if (lighting) {
      lightingSegment = lighting.prompt;
    }
  }

  // Step 8: Color grading
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

  // Step 9: Motion (VIDEO and SHORTFORM only)
  let motionSegment = '';
  if (contentType === 'VIDEO' || contentType === 'SHORTFORM') {
    const combinedSubject = [parsed.subject, parsed.action].filter(Boolean).join(' ');
    if (pro?.motion) {
      motionSegment = pro.motion;
    } else {
      motionSegment = autoMatchMotion(contentType, usageType, combinedSubject);
    }
  }

  // Step 10: Parameters
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
    subject: parsed.subject,
    action: actionSegment,
    background: backgroundSegment,
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
    segments.action,
    segments.background,
    segments.camera,
    segments.shot,
    segments.lighting,
    segments.color,
    segments.motion,
  ].filter((part) => part && part.trim() !== '');

  const descriptivePrompt = promptParts.join(', ');
  const fullPrompt = `${descriptivePrompt} ${segments.parameters}`;

  return {
    fullPrompt,
    segments,
  };
}
