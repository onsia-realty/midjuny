'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PromptHistory, PromptInput, PromptOutput } from '@/types/prompt';
import {
  getHistory,
  addHistory,
  deleteHistory,
  clearHistory as clearAll,
  toggleFavorite as toggleFav,
  rateHistory as rate,
  getFavorites,
} from '@/lib/storage/historyStore';

export function useHistory() {
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [favorites, setFavorites] = useState<PromptHistory[]>([]);

  const refresh = useCallback(() => {
    setHistory(getHistory());
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveToHistory = useCallback(
    (input: PromptInput, output: PromptOutput): string => {
      const id = addHistory(input, output);
      refresh();
      return id;
    },
    [refresh]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      toggleFav(id);
      refresh();
    },
    [refresh]
  );

  const rateEntry = useCallback(
    (id: string, rating: number) => {
      rate(id, rating);
      refresh();
    },
    [refresh]
  );

  const deleteEntry = useCallback(
    (id: string) => {
      deleteHistory(id);
      refresh();
    },
    [refresh]
  );

  const clearHistory = useCallback(() => {
    clearAll();
    refresh();
  }, [refresh]);

  return {
    history,
    favorites,
    saveToHistory,
    toggleFavorite,
    rateEntry,
    deleteEntry,
    clearHistory,
  };
}
