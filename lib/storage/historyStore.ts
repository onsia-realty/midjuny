// localStorage-based history store

import type { PromptHistory, PromptInput, PromptOutput } from '@/types/prompt';

const HISTORY_KEY = 'mj-prompt-history';

function readStore(): PromptHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStore(data: PromptHistory[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
}

export function getHistory(): PromptHistory[] {
  return readStore();
}

export function addHistory(input: PromptInput, output: PromptOutput): string {
  const history = readStore();
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const entry: PromptHistory = {
    id,
    input,
    output,
    rating: 0,
    isFavorite: false,
    tags: [],
    notes: '',
    createdAt: new Date().toISOString(),
  };
  history.unshift(entry);
  // Keep max 100 entries
  if (history.length > 100) history.length = 100;
  writeStore(history);
  return id;
}

export function updateHistory(id: string, updates: Partial<PromptHistory>): void {
  const history = readStore();
  const idx = history.findIndex((h) => h.id === id);
  if (idx === -1) return;
  history[idx] = { ...history[idx], ...updates };
  writeStore(history);
}

export function deleteHistory(id: string): void {
  const history = readStore().filter((h) => h.id !== id);
  writeStore(history);
}

export function clearHistory(): void {
  writeStore([]);
}

export function toggleFavorite(id: string): void {
  const history = readStore();
  const idx = history.findIndex((h) => h.id === id);
  if (idx === -1) return;
  history[idx].isFavorite = !history[idx].isFavorite;
  writeStore(history);
}

export function rateHistory(id: string, rating: number): void {
  updateHistory(id, { rating });
}

export function getFavorites(): PromptHistory[] {
  return readStore().filter((h) => h.isFavorite);
}
