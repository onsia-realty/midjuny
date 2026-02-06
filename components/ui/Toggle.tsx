'use client';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}

export default function Toggle({ label, checked, onChange, description }: ToggleProps) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 cursor-pointer"
      style={{ backgroundColor: 'var(--bg-card)' }}
      onClick={() => onChange(!checked)}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </span>
        {description && (
          <span
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200"
        style={{
          backgroundColor: checked
            ? 'var(--accent-primary)'
            : 'var(--border)',
        }}
      >
        <span
          className="inline-block h-4 w-4 rounded-full transition-transform duration-200"
          style={{
            backgroundColor: 'var(--text-primary)',
            transform: checked ? 'translateX(24px)' : 'translateX(4px)',
          }}
        />
      </button>
    </div>
  );
}
