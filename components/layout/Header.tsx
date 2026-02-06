'use client';

import { Image, Video, Zap } from 'lucide-react';
import type { ContentType } from '@/types/prompt';

interface HeaderProps {
  contentType: ContentType;
  onContentTypeChange: (ct: ContentType) => void;
}

const CONTENT_TYPE_TABS: {
  type: ContentType;
  label: string;
  icon: typeof Image;
  color: string;
}[] = [
  { type: 'IMAGE', label: 'IMAGE', icon: Image, color: 'var(--color-image)' },
  { type: 'VIDEO', label: 'VIDEO', icon: Video, color: 'var(--color-video)' },
  { type: 'SHORTFORM', label: 'SHORTFORM', icon: Zap, color: 'var(--color-shortform)' },
];

export default function Header({ contentType, onContentTypeChange }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-4">
        {/* Title */}
        <div className="mb-4 text-center">
          <h1
            className="text-xl font-bold tracking-tight sm:text-2xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Midjourney Pro Prompt Generator
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            온시아(주) 부동산 마케팅 + 콘텐츠 전문
          </p>
        </div>

        {/* Content Type Tabs */}
        <div className="flex items-center justify-center gap-1">
          {CONTENT_TYPE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = contentType === tab.type;

            return (
              <button
                key={tab.type}
                onClick={() => onContentTypeChange(tab.type)}
                className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors"
                style={{
                  color: isActive ? tab.color : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                  borderBottom: isActive
                    ? `2px solid ${tab.color}`
                    : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = tab.color;
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
