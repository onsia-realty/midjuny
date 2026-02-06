'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Preset, PresetSettings } from '@/types/preset';
import type { ContentType } from '@/types/prompt';
import {
  getPresets,
  addPreset,
  deletePreset,
  incrementUsage,
} from '@/lib/storage/presetStore';

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>([]);

  const refresh = useCallback(() => {
    setPresets(getPresets());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createPreset = useCallback(
    (name: string, description: string, contentType: ContentType, settings: PresetSettings) => {
      addPreset({ name, description, contentType, settings });
      refresh();
    },
    [refresh]
  );

  const removePreset = useCallback(
    (id: string) => {
      deletePreset(id);
      refresh();
    },
    [refresh]
  );

  const applyPreset = useCallback(
    (id: string): Preset | null => {
      const preset = presets.find((p) => p.id === id);
      if (!preset) return null;
      incrementUsage(id);
      refresh();
      return preset;
    },
    [presets, refresh]
  );

  return {
    presets,
    createPreset,
    removePreset,
    applyPreset,
  };
}
