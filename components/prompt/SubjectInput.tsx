'use client';

import type { ContentType } from '@/types/prompt';

interface SubjectInputProps {
  value: string;
  onChange: (v: string) => void;
  contentType: ContentType;
}

const PLACEHOLDER_MAP: Record<ContentType, string> = {
  IMAGE: '예: 한강뷰 대형 거실 인테리어',
  VIDEO: '예: 고급 주상복합 로비에서 엘리베이터까지',
  SHORTFORM: '예: 모델하우스에서 감탄하는 신혼부부',
};

const MAX_CHARS = 200;

export default function SubjectInput({ value, onChange, contentType }: SubjectInputProps) {
  const remaining = MAX_CHARS - value.length;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-sm font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        주제 (Subject)
      </label>
      <textarea
        rows={3}
        maxLength={MAX_CHARS}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={PLACEHOLDER_MAP[contentType]}
        className="w-full resize-none rounded-lg px-3 py-2.5 text-sm outline-none transition-colors placeholder:opacity-50"
        style={{
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-active)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      />
      <div
        className="flex justify-end text-xs"
        style={{
          color: remaining < 20 ? 'var(--accent-warning)' : 'var(--text-muted)',
        }}
      >
        {value.length}/{MAX_CHARS}
      </div>
    </div>
  );
}
