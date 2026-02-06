// 데이터베이스 관련 타입 정의

import type { ContentType } from './prompt';

export interface Camera {
  id: string;
  model: string;
  lens: string;
  style: string;
}

export interface CameraAngle {
  id: string;
  prompt: string;
  description: string;
  contentTypes: ContentType[];
}

export interface LightingType {
  id: string;
  prompt: string;
  category: 'natural' | 'studio' | 'cinematic' | 'real_estate';
  description: string;
}

export interface ColorGrading {
  id: string;
  prompt: string;
  description: string;
}

export interface MotionType {
  id: string;
  prompt: string;
  description: string;
  contentType: 'VIDEO' | 'SHORTFORM';
}

export interface CharacterStyle {
  tone: string;
  styling: string;
}

export interface UsageOption {
  id: string;
  label: string;
}

export interface ToneOption {
  id: string;
  label: string;
  desc: string;
}

export interface CharacterOption {
  id: string;
  label: string;
}
