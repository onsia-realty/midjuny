'use client';

import { Sparkles, RotateCcw } from 'lucide-react';
import type { ContentType } from '@/types/prompt';

interface GenerateButtonProps {
  onGenerate: () => void;
  onReset: () => void;
  disabled: boolean;
  contentType: ContentType;
}

const COLOR_MAP: Record<ContentType, string> = {
  IMAGE: 'var(--color-image)',
  VIDEO: 'var(--color-video)',
  SHORTFORM: 'var(--color-shortform)',
};

export default function GenerateButton({
  onGenerate,
  onReset,
  disabled,
  contentType,
}: GenerateButtonProps) {
  const accentColor = COLOR_MAP[contentType];

  return (
    <div className="flex gap-2">
      <button
        onClick={onGenerate}
        disabled={disabled}
        className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: disabled ? 'var(--border)' : accentColor,
          color: '#fff',
        }}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.opacity = '0.85';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <Sparkles size={16} />
        프롬프트 생성
      </button>
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
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
        <RotateCcw size={14} />
        초기화
      </button>
    </div>
  );
}
