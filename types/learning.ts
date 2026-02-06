// 학습 관련 타입 정의

import type { ContentType } from './prompt';

export interface KeywordEffectiveness {
  usageCount: number;
  avgRating: number;
  lastUsed: string;
}

export interface ContentTypeStats {
  count: number;
  avgRating: number;
  bestStylize: number;
  bestChaos: number;
}

export interface LearningData {
  totalGenerated: number;
  avgRating: number;
  topCameras: Record<string, number>;
  topLighting: Record<string, number>;
  topColorGrading: Record<string, number>;
  keywordEffectiveness: Record<string, KeywordEffectiveness>;
  contentTypeStats: Record<ContentType, ContentTypeStats>;
}

export interface CustomKeyword {
  id: string;
  category: 'camera' | 'lens' | 'lighting' | 'color' | 'motion' | 'style' | 'scene' | 'custom';
  keyword: string;
  koreanLabel: string;
  description: string;
  weight: number;
  contentTypes: ContentType[];
  usageCount: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pattern {
  keywords: string[];
  avgRating: number;
  count: number;
}

export interface Combination {
  camera: string;
  lighting: string;
  colorGrading: string;
  avgRating: number;
  count: number;
}
