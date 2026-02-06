'use client';

import { RefreshCw, Save, Heart } from 'lucide-react';

interface ActionButtonsProps {
  promptText: string | null;
  onRegenerate: () => void;
  onSave: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
  isSaved: boolean;
}

export default function ActionButtons({
  promptText,
  onRegenerate,
  onSave,
  onFavorite,
  isFavorite,
  isSaved,
}: ActionButtonsProps) {
  if (!promptText) return null;

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onRegenerate}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
        style={{
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-active)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        <RefreshCw size={12} />
        재생성
      </button>

      <button
        onClick={onSave}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
        style={{
          backgroundColor: isSaved ? 'var(--accent-success)' + '20' : 'var(--bg-card)',
          color: isSaved ? 'var(--accent-success)' : 'var(--text-secondary)',
          border: `1px solid ${isSaved ? 'var(--accent-success)' : 'var(--border)'}`,
        }}
        onMouseEnter={(e) => {
          if (!isSaved) {
            e.currentTarget.style.borderColor = 'var(--accent-success)';
            e.currentTarget.style.color = 'var(--accent-success)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSaved) {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }
        }}
      >
        <Save size={12} />
        {isSaved ? '저장됨' : '저장'}
      </button>

      <button
        onClick={onFavorite}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
        style={{
          backgroundColor: isFavorite ? '#ef444420' : 'var(--bg-card)',
          color: isFavorite ? '#ef4444' : 'var(--text-secondary)',
          border: `1px solid ${isFavorite ? '#ef4444' : 'var(--border)'}`,
        }}
        onMouseEnter={(e) => {
          if (!isFavorite) {
            e.currentTarget.style.borderColor = '#ef4444';
            e.currentTarget.style.color = '#ef4444';
          }
        }}
        onMouseLeave={(e) => {
          if (!isFavorite) {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }
        }}
      >
        <Heart size={12} fill={isFavorite ? '#ef4444' : 'none'} />
      </button>
    </div>
  );
}
