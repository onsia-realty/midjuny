// 프롬프트 관련 타입 정의

export type ContentType = 'IMAGE' | 'VIDEO' | 'SHORTFORM';

export interface ProOptions {
  camera: string;
  lighting: string;
  colorGrading: string;
  motion: string;
  stylize: number;
  chaos: number;
  negative: string;
  sref: string;
  cref: string;
  oref: string;
}

export interface PromptInput {
  subject: string;
  contentType: ContentType;
  usageType: string;
  characterType: string;
  tone: string;
  aspectRatio: string;
  proOptions?: ProOptions;
}

export interface PromptSegments {
  subject: string;
  action: string;
  background: string;
  character: string;
  camera: string;
  shot: string;
  lighting: string;
  color: string;
  motion: string;
  parameters: string;
}

export interface PromptOutput {
  fullPrompt: string;
  segments: PromptSegments;
}

export interface PromptHistory {
  id: string;
  input: PromptInput;
  output: PromptOutput;
  rating: number;
  isFavorite: boolean;
  tags: string[];
  notes: string;
  createdAt: string;
}
