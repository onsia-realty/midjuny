'use client';

import { Play, Trash2, Bookmark } from 'lucide-react';
import type { Preset } from '@/types/preset';
import type { ContentType } from '@/types/prompt';

interface PresetListProps {
  presets: Preset[];
  contentType: ContentType;
  onApply: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PresetList({
  presets,
  contentType,
  onApply,
  onDelete,
}: PresetListProps) {
  const filtered = presets.filter((p) => p.contentType === contentType);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Bookmark size={14} style={{ color: 'var(--accent-secondary)' }} />
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--text-secondary)' }}
        >
          프리셋
        </h3>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          ({filtered.length})
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-xs py-3 text-center" style={{ color: 'var(--text-muted)' }}>
          저장된 프리셋이 없습니다
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {filtered.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-active)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {preset.name}
                </span>
                {preset.description && (
                  <span
                    className="text-xs truncate"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {preset.description}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <span className="text-xs mr-1" style={{ color: 'var(--text-muted)' }}>
                  {preset.usageCount}회
                </span>
                <button
                  onClick={() => onApply(preset.id)}
                  className="rounded p-1.5 transition-colors"
                  style={{ color: 'var(--accent-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)' + '20';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title="적용"
                >
                  <Play size={12} />
                </button>
                {!preset.isDefault && (
                  <button
                    onClick={() => onDelete(preset.id)}
                    className="rounded p-1.5 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ef4444';
                      e.currentTarget.style.backgroundColor = '#ef444420';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title="삭제"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
