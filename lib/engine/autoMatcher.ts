// Auto-matching engine - selects camera, lighting, color, motion, etc. based on context

import type { ContentType } from '@/types/prompt';
import { AR_MAP, STYLIZE_MAP } from '@/lib/utils/constants';
import { VIDEO_MOTION_DB, SHORTFORM_MOTION_DB } from '@/lib/database/motions';
import { NEGATIVE_PROMPTS } from '@/lib/database/negativePrompts';

/**
 * Auto-match camera DB key based on subject, character type, and usage type.
 */
export function autoMatchCamera(
  subject: string,
  characterType: string,
  usageType: string
): string {
  const subjectLower = subject.toLowerCase();

  // Real estate interior usage
  if (
    usageType === 'real_estate_listing' ||
    usageType === 'real_estate_marketing' ||
    subjectLower.includes('interior') ||
    subjectLower.includes('room') ||
    subjectLower.includes('kitchen') ||
    subjectLower.includes('bathroom') ||
    subjectLower.includes('bedroom') ||
    subjectLower.includes('living room') ||
    subjectLower.includes('lobby')
  ) {
    return 'architecture_interior';
  }

  // Architecture exterior
  if (
    usageType === 'architecture_exterior' ||
    subjectLower.includes('building') ||
    subjectLower.includes('exterior') ||
    subjectLower.includes('facade')
  ) {
    return 'architecture_exterior';
  }

  // Aerial / drone
  if (
    subjectLower.includes('aerial') ||
    subjectLower.includes('drone') ||
    subjectLower.includes("bird's eye")
  ) {
    return 'aerial';
  }

  // Product
  if (
    usageType === 'product_reveal' ||
    subjectLower.includes('product')
  ) {
    return 'product';
  }

  // Portrait character types
  if (
    characterType === 'korean_male' ||
    characterType === 'korean_female' ||
    characterType === 'office_worker_male' ||
    characterType === 'office_worker_female' ||
    characterType === 'real_estate_agent_m' ||
    characterType === 'real_estate_agent_f' ||
    characterType === 'young_professional' ||
    characterType === 'senior'
  ) {
    // Environmental portrait for real estate or scene-based situations
    if (
      usageType.includes('real_estate') ||
      subjectLower.includes('office') ||
      subjectLower.includes('consulting') ||
      subjectLower.includes('meeting')
    ) {
      return 'environmental_portrait';
    }
    return 'portrait';
  }

  // Couple / family → environmental portrait
  if (
    characterType === 'korean_couple' ||
    characterType === 'korean_family'
  ) {
    return 'environmental_portrait';
  }

  // Cinematic usage
  if (
    usageType === 'cinematic_ad' ||
    usageType === 'brand_video' ||
    subjectLower.includes('cinematic')
  ) {
    return 'cinematic';
  }

  // Landscape
  if (
    subjectLower.includes('landscape') ||
    subjectLower.includes('mountain') ||
    subjectLower.includes('ocean') ||
    subjectLower.includes('river') ||
    subjectLower.includes('forest') ||
    subjectLower.includes('sunset') ||
    subjectLower.includes('sunrise')
  ) {
    return 'landscape';
  }

  // Fashion
  if (
    usageType.includes('fashion') ||
    subjectLower.includes('fashion') ||
    subjectLower.includes('editorial')
  ) {
    return 'fashion';
  }

  // Default
  return 'environmental_portrait';
}

/**
 * Auto-match shot/angle prompt string based on character, usage, and content type.
 */
export function autoMatchShot(
  characterType: string,
  usageType: string,
  _contentType: ContentType
): string {
  // No person - real estate interior
  if (characterType === 'no_person') {
    if (
      usageType.includes('real_estate') ||
      usageType.includes('interior') ||
      usageType.includes('listing')
    ) {
      return 'eye level composition showing full depth of space';
    }
    return 'wide establishing shot';
  }

  // Couple or family
  if (
    characterType === 'korean_couple' ||
    characterType === 'korean_family'
  ) {
    return 'medium shot, waist up';
  }

  // Over shoulder for consulting/meeting scenarios
  if (
    usageType.includes('consulting') ||
    usageType.includes('meeting') ||
    usageType.includes('상담')
  ) {
    return 'over the shoulder shot';
  }

  // Close-up for product
  if (
    usageType === 'product_reveal' ||
    usageType.includes('product')
  ) {
    return 'close-up shot, filling frame';
  }

  // Low angle for architecture exterior
  if (
    usageType === 'architecture_exterior' ||
    usageType.includes('building')
  ) {
    return 'low angle shot, from below';
  }

  // Wide for buildings/exterior
  if (
    usageType.includes('exterior') ||
    usageType.includes('real_estate_marketing')
  ) {
    return 'wide establishing shot';
  }

  // Default medium shot
  return 'medium shot, waist up';
}

/**
 * Auto-match lighting DB key based on tone, usage type, and content type.
 */
export function autoMatchLighting(
  tone: string,
  usageType: string,
  _contentType: ContentType
): string {
  // Real estate specific lighting
  if (usageType === 'real_estate_listing') {
    return 'real_estate_interior';
  }
  if (usageType === 'real_estate_marketing' || usageType === 'real_estate_tour') {
    return 'real_estate_exterior';
  }

  // Tone-based matching
  switch (tone) {
    case 'professional':
      if (usageType.includes('interior') || usageType.includes('office')) {
        return 'window_light';
      }
      return 'softbox';

    case 'luxury':
      return 'golden_hour';

    case 'friendly':
    case 'warm':
      return 'golden_hour';

    case 'modern':
    case 'minimal':
      return 'window_light';

    case 'cinematic':
      return 'cinematic_warm';

    case 'energetic':
      return 'backlight';

    case 'dramatic':
      return 'dramatic';

    case 'editorial':
      return 'rim_light';

    default:
      return 'softbox';
  }
}

/**
 * Auto-match color grading DB key based on tone, content type, and usage type.
 */
export function autoMatchColor(
  tone: string,
  contentType: ContentType,
  usageType: string
): string {
  // Real estate specific
  if (usageType.includes('real_estate')) {
    return 'golden_warm';
  }

  // Content type specific defaults
  if (contentType === 'SHORTFORM') {
    return 'vibrant_pop';
  }

  if (contentType === 'VIDEO') {
    return 'cinematic_lut';
  }

  // IMAGE - usage-based
  if (usageType === 'landing_page' || usageType === 'banner_ad') {
    return 'cinematic_lut';
  }

  if (
    usageType === 'blog_header' ||
    usageType === 'blog_content' ||
    usageType === 'naver_blog'
  ) {
    return 'muted_film';
  }

  if (usageType === 'instagram_feed' || usageType === 'instagram_story') {
    return 'vibrant_pop';
  }

  // Tone-based fallback
  switch (tone) {
    case 'luxury':
      return 'luxury_dark';
    case 'warm':
    case 'friendly':
      return 'warm_earth';
    case 'modern':
    case 'minimal':
      return 'nordic_minimal';
    case 'cinematic':
    case 'dramatic':
      return 'cinematic_lut';
    case 'editorial':
      return 'kodak_portra';
    case 'energetic':
      return 'vibrant_pop';
    case 'professional':
      return 'cool_teal';
    default:
      return 'cinematic_lut';
  }
}

/**
 * Auto-match motion prompt for VIDEO and SHORTFORM content types.
 */
export function autoMatchMotion(
  contentType: ContentType,
  usageType: string,
  subject: string
): string {
  const subjectLower = subject.toLowerCase();

  if (contentType === 'VIDEO') {
    // Real estate tour - tracking + crane
    if (usageType.includes('real_estate') || usageType === 'real_estate_tour') {
      const tracking = VIDEO_MOTION_DB['tracking_forward']?.prompt ?? '';
      const crane = VIDEO_MOTION_DB['crane_up']?.prompt ?? '';
      return `${tracking}, ${crane}`;
    }

    // Person ad - orbital + steady walk
    if (
      subjectLower.includes('person') ||
      subjectLower.includes('model') ||
      subjectLower.includes('woman') ||
      subjectLower.includes('man') ||
      subjectLower.includes('agent') ||
      usageType === 'brand_video'
    ) {
      const orbital = VIDEO_MOTION_DB['orbital']?.prompt ?? '';
      const steady = VIDEO_MOTION_DB['steady_walk']?.prompt ?? '';
      return `${orbital}, ${steady}`;
    }

    // Building exterior - fpv drone + crane up
    if (
      subjectLower.includes('building') ||
      subjectLower.includes('exterior') ||
      subjectLower.includes('architecture')
    ) {
      const fpv = VIDEO_MOTION_DB['fpv_drone']?.prompt ?? '';
      const crane = VIDEO_MOTION_DB['crane_up']?.prompt ?? '';
      return `${fpv}, ${crane}`;
    }

    // Default video motion
    return VIDEO_MOTION_DB['tracking_forward']?.prompt ?? '';
  }

  if (contentType === 'SHORTFORM') {
    // Person - wind hair + dynamic pose
    if (
      subjectLower.includes('person') ||
      subjectLower.includes('model') ||
      subjectLower.includes('woman') ||
      subjectLower.includes('man') ||
      subjectLower.includes('agent') ||
      subjectLower.includes('couple') ||
      subjectLower.includes('family')
    ) {
      const wind = SHORTFORM_MOTION_DB['wind_hair']?.prompt ?? '';
      const dynamic = SHORTFORM_MOTION_DB['dynamic_pose']?.prompt ?? '';
      return `${wind}, ${dynamic}`;
    }

    // Product - orbital + particle float
    if (
      subjectLower.includes('product') ||
      usageType === 'shortform_ad'
    ) {
      const orbital = SHORTFORM_MOTION_DB['particle_float']?.prompt ?? '';
      const bokeh = SHORTFORM_MOTION_DB['bokeh_shift']?.prompt ?? '';
      return `${orbital}, ${bokeh}`;
    }

    // Default shortform motion
    return SHORTFORM_MOTION_DB['light_flicker']?.prompt ?? '';
  }

  // IMAGE - no motion
  return '';
}

/**
 * Auto-match aspect ratio from AR_MAP by usage type.
 */
export function autoMatchAR(usageType: string): string {
  return AR_MAP[usageType] ?? '16:9';
}

/**
 * Auto-match stylize value from STYLIZE_MAP by content type and usage type.
 */
export function autoMatchStylize(
  contentType: ContentType,
  usageType: string
): number {
  if (STYLIZE_MAP[usageType] !== undefined) {
    return STYLIZE_MAP[usageType];
  }

  // Content type defaults
  switch (contentType) {
    case 'IMAGE':
      return 200;
    case 'VIDEO':
      return 250;
    case 'SHORTFORM':
      return 400;
    default:
      return 200;
  }
}

/**
 * Auto-match negative prompt from NEGATIVE_PROMPTS by usage type.
 */
export function autoMatchNegative(usageType: string): string {
  return NEGATIVE_PROMPTS[usageType] ?? NEGATIVE_PROMPTS['default'] ?? 'blurry, distorted';
}
