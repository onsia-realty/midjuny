'use client';

import type { PromptSegments as PromptSegmentsType, ContentType } from '@/types/prompt';

interface PromptSegmentsProps {
  segments: PromptSegmentsType | null;
  contentType: ContentType;
}

const SEGMENT_CONFIG: {
  key: keyof PromptSegmentsType;
  label: string;
  className: string;
}[] = [
  { key: 'subject', label: 'Subject', className: 'segment-subject' },
  { key: 'character', label: 'Character', className: 'segment-character' },
  { key: 'action', label: 'Action', className: 'segment-action' },
  { key: 'background', label: 'Background', className: 'segment-background' },
  { key: 'camera', label: 'Camera', className: 'segment-camera' },
  { key: 'shot', label: 'Shot', className: 'segment-shot' },
  { key: 'lighting', label: 'Lighting', className: 'segment-lighting' },
  { key: 'color', label: 'Color', className: 'segment-color' },
  { key: 'motion', label: 'Motion', className: 'segment-motion' },
  { key: 'parameters', label: 'Parameters', className: 'segment-params' },
];

export default function PromptSegments({ segments, contentType }: PromptSegmentsProps) {
  if (!segments) return null;

  const visibleSegments = SEGMENT_CONFIG.filter(
    (s) => segments[s.key] && segments[s.key].trim() !== ''
  );

  if (visibleSegments.length === 0) return null;

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: 'var(--text-muted)' }}
      >
        Prompt Breakdown
      </h3>
      <div className="flex flex-col gap-2">
        {visibleSegments.map((seg) => (
          <div key={seg.key} className="flex items-start gap-2">
            <span
              className="shrink-0 w-20 text-right text-xs font-medium pt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              {seg.label}
            </span>
            <span className={`text-xs font-mono-prompt leading-relaxed ${seg.className}`}>
              {segments[seg.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
