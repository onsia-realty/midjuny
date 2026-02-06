import type { LightingType } from '@/types/database';

export const LIGHTING_DB: Record<string, LightingType> = {
  // Natural lighting (7)
  golden_hour: {
    id: 'golden_hour',
    prompt: 'golden hour lighting, warm sunlight, long shadows',
    category: 'natural',
    description: 'Warm, soft sunlight during the hour after sunrise or before sunset',
  },
  blue_hour: {
    id: 'blue_hour',
    prompt: 'blue hour lighting, cool ambient twilight',
    category: 'natural',
    description: 'Cool, diffused blue light just before sunrise or after sunset',
  },
  overcast: {
    id: 'overcast',
    prompt: 'overcast soft diffused lighting, even illumination',
    category: 'natural',
    description: 'Soft, even lighting from cloud-covered sky eliminating harsh shadows',
  },
  harsh_midday: {
    id: 'harsh_midday',
    prompt: 'harsh midday sun, strong shadows, high contrast',
    category: 'natural',
    description: 'Direct overhead sunlight creating strong shadows and high contrast',
  },
  window_light: {
    id: 'window_light',
    prompt: 'natural window light, soft directional illumination',
    category: 'natural',
    description: 'Soft directional light streaming through a window',
  },
  backlight: {
    id: 'backlight',
    prompt: 'backlit, rim of light around subject, silhouette edge',
    category: 'natural',
    description: 'Light source behind the subject creating rim lighting and silhouette edges',
  },
  dappled: {
    id: 'dappled',
    prompt: 'dappled light through leaves, organic shadow patterns',
    category: 'natural',
    description: 'Sunlight filtered through tree canopy creating organic shadow patterns',
  },

  // Studio lighting (7)
  softbox: {
    id: 'softbox',
    prompt: 'softbox studio lighting, even soft illumination',
    category: 'studio',
    description: 'Large diffused studio light providing even, wrapping illumination',
  },
  rembrandt: {
    id: 'rembrandt',
    prompt: 'Rembrandt lighting, triangle of light on cheek',
    category: 'studio',
    description: 'Classic portrait lighting with triangle of light on shadow-side cheek',
  },
  split: {
    id: 'split',
    prompt: 'split lighting, half face illuminated, half in shadow',
    category: 'studio',
    description: 'Dramatic lighting with exactly half the face lit and half in shadow',
  },
  butterfly: {
    id: 'butterfly',
    prompt: 'butterfly lighting, overhead centered, shadow under nose',
    category: 'studio',
    description: 'Glamour lighting from directly above creating butterfly shadow under nose',
  },
  rim_light: {
    id: 'rim_light',
    prompt: 'rim light, glowing edge outline, dark background',
    category: 'studio',
    description: 'Light from behind creating a glowing outline around the subject',
  },
  broad: {
    id: 'broad',
    prompt: 'broad lighting, wide side of face illuminated',
    category: 'studio',
    description: 'Portrait lighting where the side of the face toward camera is illuminated',
  },
  loop: {
    id: 'loop',
    prompt: 'loop lighting, small shadow beside nose',
    category: 'studio',
    description: 'Subtle portrait lighting creating a small shadow loop beside the nose',
  },

  // Cinematic lighting (6)
  cinematic_warm: {
    id: 'cinematic_warm',
    prompt: 'cinematic warm lighting, amber tones, film atmosphere',
    category: 'cinematic',
    description: 'Warm cinematic lighting with amber tones evoking film atmosphere',
  },
  cinematic_cool: {
    id: 'cinematic_cool',
    prompt: 'cinematic cool lighting, blue steel tones, moody atmosphere',
    category: 'cinematic',
    description: 'Cool cinematic lighting with blue steel tones and moody atmosphere',
  },
  neon: {
    id: 'neon',
    prompt: 'neon lighting, colorful neon glow, urban night',
    category: 'cinematic',
    description: 'Colorful neon light sources casting vibrant urban night glow',
  },
  dramatic: {
    id: 'dramatic',
    prompt: 'dramatic chiaroscuro lighting, deep shadows, bright highlights',
    category: 'cinematic',
    description: 'High-contrast dramatic lighting with deep shadows and bright highlights',
  },
  volumetric: {
    id: 'volumetric',
    prompt: 'volumetric lighting, visible light rays, atmospheric haze',
    category: 'cinematic',
    description: 'Visible light rays cutting through atmospheric haze or fog',
  },
  practical: {
    id: 'practical',
    prompt: 'practical lighting, motivated light sources within scene',
    category: 'cinematic',
    description: 'Lighting from visible in-scene sources like lamps, candles, or screens',
  },

  // Real estate lighting (3)
  real_estate_interior: {
    id: 'real_estate_interior',
    prompt: 'bright balanced interior lighting, natural window light, no harsh shadows',
    category: 'real_estate',
    description: 'Clean, bright interior lighting balanced with natural window light',
  },
  real_estate_exterior: {
    id: 'real_estate_exterior',
    prompt: 'clear daylight exterior, blue sky, well-lit facade',
    category: 'real_estate',
    description: 'Clear daylight illuminating building exterior with blue sky backdrop',
  },
  real_estate_twilight: {
    id: 'real_estate_twilight',
    prompt: 'twilight exterior, warm interior glow, deep blue sky',
    category: 'real_estate',
    description: 'Twilight shot with warm interior lights glowing against deep blue sky',
  },
};
