'use client';

import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import type { PromptOutput, ContentType } from '@/types/prompt';

interface ResultBoxProps {
  output: PromptOutput | null;
  contentType: ContentType;
}

const COLOR_MAP: Record<ContentType, string> = {
  IMAGE: 'var(--color-image)',
  VIDEO: 'var(--color-video)',
  SHORTFORM: 'var(--color-shortform)',
};

export default function ResultBox({ output, contentType }: ResultBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = output.fullPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output]);

  if (!output) {
    return (
      <div
        className="flex items-center justify-center rounded-lg p-8 text-center"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px dashed var(--border)',
          minHeight: '160px',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          왼쪽에서 주제를 입력하고 &quot;프롬프트 생성&quot; 버튼을 클릭하세요
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg overflow-hidden animate-fadeIn"
      style={{
        border: `1px solid ${COLOR_MAP[contentType]}`,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          backgroundColor: `${COLOR_MAP[contentType]}15`,
          borderBottom: `1px solid ${COLOR_MAP[contentType]}30`,
        }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: COLOR_MAP[contentType] }}
        >
          Generated Prompt
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            color: copied ? 'var(--accent-success)' : 'var(--text-secondary)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
      <div
        className="p-4"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        <p
          className="font-mono-prompt text-sm leading-relaxed break-all"
          style={{ color: 'var(--text-primary)' }}
        >
          {output.fullPrompt}
        </p>
      </div>
    </div>
  );
}
