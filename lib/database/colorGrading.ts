import type { ColorGrading } from '@/types/database';

export const COLOR_GRADING_DB: Record<string, ColorGrading> = {
  warm_earth: {
    id: 'warm_earth',
    prompt: 'warm earth tones, terracotta and amber palette, natural warmth',
    description: 'Warm earthy color palette with terracotta, amber, and natural warmth',
  },
  cool_teal: {
    id: 'cool_teal',
    prompt: 'cool teal and orange color grading, complementary contrast',
    description: 'Teal and orange complementary color grading for cinematic contrast',
  },
  muted_film: {
    id: 'muted_film',
    prompt: 'muted film color grading, desaturated tones, lifted blacks',
    description: 'Desaturated muted tones with lifted blacks for vintage film look',
  },
  vibrant_pop: {
    id: 'vibrant_pop',
    prompt: 'vibrant saturated colors, punchy contrast, bold palette',
    description: 'Highly saturated vibrant colors with punchy contrast and bold palette',
  },
  monochrome: {
    id: 'monochrome',
    prompt: 'black and white, high contrast monochrome, rich tonal range',
    description: 'Classic black and white with high contrast and rich tonal range',
  },
  pastel_soft: {
    id: 'pastel_soft',
    prompt: 'soft pastel color palette, gentle hues, dreamy tones',
    description: 'Soft pastel palette with gentle hues and dreamy light tones',
  },
  cinematic_lut: {
    id: 'cinematic_lut',
    prompt: 'cinematic color grading, teal shadows, warm highlights, film LUT',
    description: 'Professional cinematic LUT with teal shadows and warm highlights',
  },
  golden_warm: {
    id: 'golden_warm',
    prompt: 'golden warm tones, honey-tinted highlights, rich shadows',
    description: 'Golden warm tones with honey-tinted highlights and rich shadows',
  },
  nordic_minimal: {
    id: 'nordic_minimal',
    prompt: 'nordic minimal color palette, cool whites, muted blues, clean tones',
    description: 'Clean nordic palette with cool whites, muted blues, and minimal tones',
  },
  luxury_dark: {
    id: 'luxury_dark',
    prompt: 'luxury dark tones, deep blacks, gold accents, rich contrast',
    description: 'Dark luxury palette with deep blacks, gold accents, and rich contrast',
  },
  film_noir: {
    id: 'film_noir',
    prompt: 'film noir style, high contrast black and white, dramatic shadows',
    description: 'Classic film noir with high contrast black and white and dramatic shadows',
  },
  kodak_portra: {
    id: 'kodak_portra',
    prompt: 'Kodak Portra 400 film emulation, warm skin tones, soft grain',
    description: 'Kodak Portra 400 film stock emulation with warm skin tones and soft grain',
  },
  fuji_velvia: {
    id: 'fuji_velvia',
    prompt: 'Fuji Velvia 50 film emulation, vivid saturated colors, deep contrast',
    description: 'Fuji Velvia 50 film stock emulation with vivid saturated colors and deep contrast',
  },
};
