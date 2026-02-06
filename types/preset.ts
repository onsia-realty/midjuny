// 프리셋 관련 타입 정의

import type { ContentType } from './prompt';

export interface PresetSettings {
  usageType: string;
  characterType: string;
  tone: string;
  aspectRatio: string;
  camera?: string;
  lighting?: string;
  colorGrading?: string;
  motion?: string;
  stylize: number;
  chaos: number;
  negative?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  contentType: ContentType;
  settings: PresetSettings;
  usageCount: number;
  isDefault: boolean;
  createdAt: string;
}
