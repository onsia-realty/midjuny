'use client';

import { useState, useCallback } from 'react';
import type { ContentType, ProOptions, PromptOutput } from '@/types/prompt';
import { generatePrompt } from '@/lib/engine/promptEngine';
import { AR_MAP, STYLIZE_MAP } from '@/lib/utils/constants';

interface EngineState {
  subject: string;
  contentType: ContentType;
  usageType: string;
  characterType: string;
  tone: string;
  aspectRatio: string;
  proMode: boolean;
  proOptions: ProOptions;
  output: PromptOutput | null;
}

const DEFAULT_PRO_OPTIONS: ProOptions = {
  camera: '',
  lighting: '',
  colorGrading: '',
  motion: '',
  stylize: 200,
  chaos: 0,
  negative: '',
  sref: '',
  cref: '',
  oref: '',
};

const INITIAL_STATE: EngineState = {
  subject: '',
  contentType: 'IMAGE',
  usageType: 'landing_page',
  characterType: 'no_person',
  tone: 'professional',
  aspectRatio: '16:9',
  proMode: false,
  proOptions: { ...DEFAULT_PRO_OPTIONS },
  output: null,
};

export function usePromptEngine() {
  const [state, setState] = useState<EngineState>(INITIAL_STATE);

  const setSubject = useCallback((subject: string) => {
    setState((prev) => ({ ...prev, subject }));
  }, []);

  const setContentType = useCallback((contentType: ContentType) => {
    setState((prev) => ({
      ...prev,
      contentType,
      // Reset usage type to first option for new content type
      usageType: contentType === 'IMAGE' ? 'landing_page'
        : contentType === 'VIDEO' ? 'youtube_intro'
        : 'reels',
      // Auto-update AR
      aspectRatio: contentType === 'SHORTFORM' ? '9:16' : '16:9',
    }));
  }, []);

  const setUsageType = useCallback((usageType: string) => {
    setState((prev) => ({
      ...prev,
      usageType,
      aspectRatio: AR_MAP[usageType] || prev.aspectRatio,
      proOptions: {
        ...prev.proOptions,
        stylize: STYLIZE_MAP[usageType] ?? prev.proOptions.stylize,
      },
    }));
  }, []);

  const setCharacterType = useCallback((characterType: string) => {
    setState((prev) => ({ ...prev, characterType }));
  }, []);

  const setTone = useCallback((tone: string) => {
    setState((prev) => ({ ...prev, tone }));
  }, []);

  const setAspectRatio = useCallback((aspectRatio: string) => {
    setState((prev) => ({ ...prev, aspectRatio }));
  }, []);

  const setProMode = useCallback((proMode: boolean) => {
    setState((prev) => ({ ...prev, proMode }));
  }, []);

  const setProOption = useCallback((key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      proOptions: { ...prev.proOptions, [key]: value },
    }));
  }, []);

  const generate = useCallback(() => {
    if (!state.subject.trim()) return null;
    const output = generatePrompt(
      {
        subject: state.subject,
        contentType: state.contentType,
        usageType: state.usageType,
        characterType: state.characterType,
        tone: state.tone,
        aspectRatio: state.aspectRatio,
        proOptions: state.proMode ? state.proOptions : undefined,
      },
      state.proMode ? state.proOptions : undefined
    );
    setState((prev) => ({ ...prev, output }));
    return output;
  }, [state]);

  const regenerate = useCallback(() => {
    return generate();
  }, [generate]);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    generate,
    regenerate,
    reset,
    setSubject,
    setContentType,
    setUsageType,
    setCharacterType,
    setTone,
    setAspectRatio,
    setProMode,
    setProOption,
  };
}
