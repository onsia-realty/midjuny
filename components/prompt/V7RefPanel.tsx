'use client';

import { Link } from 'lucide-react';

interface V7RefPanelProps {
  sref: string;
  cref: string;
  oref: string;
  onSrefChange: (v: string) => void;
  onCrefChange: (v: string) => void;
  onOrefChange: (v: string) => void;
}

const REF_FIELDS: {
  key: 'sref' | 'cref' | 'oref';
  label: string;
  param: string;
  description: string;
}[] = [
  { key: 'sref', label: 'Style Reference', param: '--sref', description: '스타일 참조 이미지' },
  { key: 'cref', label: 'Character Reference', param: '--cref', description: '캐릭터 참조 이미지' },
  { key: 'oref', label: 'Object Reference', param: '--oref', description: '오브젝트 참조 이미지' },
];

export default function V7RefPanel({
  sref,
  cref,
  oref,
  onSrefChange,
  onCrefChange,
  onOrefChange,
}: V7RefPanelProps) {
  const values: Record<string, string> = { sref, cref, oref };
  const handlers: Record<string, (v: string) => void> = {
    sref: onSrefChange,
    cref: onCrefChange,
    oref: onOrefChange,
  };

  return (
    <div className="flex flex-col gap-4">
      <h3
        className="flex items-center gap-2 text-sm font-semibold"
        style={{ color: 'var(--text-secondary)' }}
      >
        <Link size={14} />
        V7 Reference URLs
      </h3>

      <div className="flex flex-col gap-3">
        {REF_FIELDS.map((field) => (
          <div key={field.key} className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {field.label}{' '}
              <span style={{ color: 'var(--accent-primary)' }}>
                ({field.param})
              </span>
            </label>
            <input
              type="url"
              value={values[field.key]}
              onChange={(e) => handlers[field.key](e.target.value)}
              placeholder="URL 입력..."
              className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:opacity-50"
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
          </div>
        ))}
      </div>
    </div>
  );
}
