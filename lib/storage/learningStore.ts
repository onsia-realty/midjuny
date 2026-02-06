// localStorage-based learning data store

import type { LearningData, ContentTypeStats } from '@/types/learning';
import type { ContentType } from '@/types/prompt';

const LEARNING_KEY = 'mj-prompt-learning';

const DEFAULT_CONTENT_STATS: ContentTypeStats = {
  count: 0,
  avgRating: 0,
  bestStylize: 200,
  bestChaos: 0,
};

const DEFAULT_LEARNING: LearningData = {
  totalGenerated: 0,
  avgRating: 0,
  topCameras: {},
  topLighting: {},
  topColorGrading: {},
  keywordEffectiveness: {},
  contentTypeStats: {
    IMAGE: { ...DEFAULT_CONTENT_STATS },
    VIDEO: { ...DEFAULT_CONTENT_STATS },
    SHORTFORM: { ...DEFAULT_CONTENT_STATS },
  },
};

function readStore(): LearningData {
  if (typeof window === 'undefined') return { ...DEFAULT_LEARNING };
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_LEARNING };
  } catch {
    return { ...DEFAULT_LEARNING };
  }
}

function writeStore(data: LearningData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LEARNING_KEY, JSON.stringify(data));
}

export function getLearningData(): LearningData {
  return readStore();
}

export function recordGeneration(contentType: ContentType): void {
  const data = readStore();
  data.totalGenerated += 1;
  if (!data.contentTypeStats[contentType]) {
    data.contentTypeStats[contentType] = { ...DEFAULT_CONTENT_STATS };
  }
  data.contentTypeStats[contentType].count += 1;
  writeStore(data);
}

export function recordRating(contentType: ContentType, rating: number): void {
  const data = readStore();
  const stats = data.contentTypeStats[contentType];
  if (!stats) return;
  const total = stats.count || 1;
  stats.avgRating = (stats.avgRating * (total - 1) + rating) / total;
  // Update global avg
  const allRatings = Object.values(data.contentTypeStats).reduce(
    (sum, s) => sum + s.avgRating * s.count,
    0
  );
  const allCount = Object.values(data.contentTypeStats).reduce(
    (sum, s) => sum + s.count,
    0
  );
  data.avgRating = allCount > 0 ? allRatings / allCount : 0;
  writeStore(data);
}

export function recordOption(category: 'topCameras' | 'topLighting' | 'topColorGrading', key: string): void {
  if (!key) return;
  const data = readStore();
  data[category][key] = (data[category][key] || 0) + 1;
  writeStore(data);
}
