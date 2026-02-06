export const NEGATIVE_PROMPTS: Record<string, string> = {
  // Real estate
  real_estate_listing:
    'blurry, distorted, cartoon, illustration, people, clutter, personal items',
  real_estate_marketing: 'blurry, distorted, cartoon, illustration',

  // YouTube
  youtube_thumbnail: 'text, watermark, logo, blurry',
  youtube_cover: 'text, watermark, logo, blurry, low quality',

  // Instagram
  instagram_feed: 'text, watermark, low quality',
  instagram_story: 'text, watermark, low quality, pixelated',
  instagram_reel: 'text, watermark, low quality, jittery',

  // Blog & web
  blog_hero: 'text, watermark, logo, cluttered, busy background',
  blog_featured: 'text, watermark, low quality, blurry',
  website_banner: 'text, watermark, logo, blurry, pixelated',
  website_hero: 'text, watermark, logo, cluttered',

  // Portrait & headshot
  portrait_headshot: 'distorted features, extra limbs, blurry, low quality',
  portrait_editorial: 'distorted features, extra limbs, watermark, text',
  portrait_environmental: 'distorted features, extra limbs, cluttered background',

  // Product
  product_hero: 'blurry, distorted, text, watermark, cluttered background',
  product_lifestyle: 'blurry, distorted, text, watermark, low quality',
  product_catalog: 'blurry, distorted, text, watermark, busy background',

  // Social media general
  social_media: 'text, watermark, low quality, blurry',
  tiktok: 'text, watermark, low quality, jittery',
  facebook_post: 'text, watermark, low quality, blurry',
  linkedin_post: 'text, watermark, low quality, unprofessional',

  // Video & cinematic
  cinematic: 'shaky, blurry, low quality, amateur, distorted',
  music_video: 'blurry, low quality, amateur, watermark',
  commercial: 'blurry, low quality, amateur, watermark, text overlay',
  short_film: 'shaky, blurry, low quality, amateur',

  // Architecture & interior
  architecture_exterior: 'distorted lines, blurry, cartoon, people, clutter',
  architecture_interior: 'distorted lines, blurry, cartoon, clutter, personal items',
  interior_design: 'distorted lines, blurry, cartoon, clutter, personal items',

  // Fashion
  fashion_editorial: 'distorted features, extra limbs, blurry, low quality',
  fashion_lookbook: 'distorted features, extra limbs, watermark, text',

  // Food
  food_photography: 'blurry, unappetizing, artificial, watermark, text',

  // Travel & landscape
  travel: 'blurry, low quality, watermark, text, people',
  landscape: 'blurry, low quality, watermark, text, artificial',

  // Default fallback
  default: 'blurry, distorted, low quality, watermark, text',
};

export const JUNK_KEYWORDS: string[] = [
  'photorealistic',
  '8k',
  '4k',
  'UHD',
  'ultra detailed',
  'award winning',
  'masterpiece',
  'best quality',
  'highly detailed',
  'hyper realistic',
];
