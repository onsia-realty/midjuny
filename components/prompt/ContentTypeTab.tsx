'use client';

import { Image, Video, Zap } from 'lucide-react';
import type { ContentType } from '@/types/prompt';

interface ContentTypeTabProps {
  contentType: ContentType;
}

const CONTENT_TYPE_INFO: Record<
  ContentType,
  { icon: typeof Image; label: string; description: string; color: string }
> = {
  IMAGE: {
    icon: Image,
    label: 'IMAGE',
    description: '정적 이미지 생성',
    color: 'var(--color-image)',
  },
  VIDEO: {
    icon: Video,
    label: 'VIDEO',
    description: '영상 콘텐츠 생성',
    color: 'var(--color-video)',
  },
  SHORTFORM: {
    icon: Zap,
    label: 'SHORTFORM',
    description: '숏폼 콘텐츠 생성',
    color: 'var(--color-shortform)',
  },
};

export default function ContentTypeTab({ contentType }: ContentTypeTabProps) {
  const info = CONTENT_TYPE_INFO[contentType];
  const Icon = info.icon;

  return (
    <div
      className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 animate-fadeIn"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: `1px solid ${info.color}`,
      }}
    >
      <Icon size={18} style={{ color: info.color }} />
      <div className="flex items-center gap-2">
        <span
          className="text-sm font-semibold"
          style={{ color: info.color }}
        >
          {info.label}
        </span>
        <span
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {info.description}
        </span>
      </div>
    </div>
  );
}
