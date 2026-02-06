// localStorage-based preset store

import type { Preset } from '@/types/preset';
import type { ContentType } from '@/types/prompt';

const PRESET_KEY = 'mj-prompt-presets';

function readStore(): Preset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PRESET_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStore(data: Preset[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PRESET_KEY, JSON.stringify(data));
}

export function getPresets(): Preset[] {
  return readStore();
}

export function getPresetsByContentType(contentType: ContentType): Preset[] {
  return readStore().filter((p) => p.contentType === contentType);
}

export function addPreset(preset: Omit<Preset, 'id' | 'usageCount' | 'isDefault' | 'createdAt'>): string {
  const presets = readStore();
  const id = `preset-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const entry: Preset = {
    ...preset,
    id,
    usageCount: 0,
    isDefault: false,
    createdAt: new Date().toISOString(),
  };
  presets.push(entry);
  writeStore(presets);
  return id;
}

export function deletePreset(id: string): void {
  const presets = readStore().filter((p) => p.id !== id);
  writeStore(presets);
}

export function incrementUsage(id: string): void {
  const presets = readStore();
  const idx = presets.findIndex((p) => p.id === id);
  if (idx === -1) return;
  presets[idx].usageCount += 1;
  writeStore(presets);
}
