'use client';

import Slider from '@/components/ui/Slider';

interface ParameterPanelProps {
  stylize: number;
  chaos: number;
  negative: string;
  onStylizeChange: (v: number) => void;
  onChaosChange: (v: number) => void;
  onNegativeChange: (v: string) => void;
}

export default function ParameterPanel({
  stylize,
  chaos,
  negative,
  onStylizeChange,
  onChaosChange,
  onNegativeChange,
}: ParameterPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <h3
        className="text-sm font-semibold"
        style={{ color: 'var(--text-secondary)' }}
      >
        Parameters
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Slider
          label="Stylize (--s)"
          value={stylize}
          min={0}
          max={1000}
          step={10}
          onChange={onStylizeChange}
        />
        <Slider
          label="Chaos (--c)"
          value={chaos}
          min={0}
          max={100}
          step={5}
          onChange={onChaosChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          Negative Prompt (--no)
        </label>
        <input
          type="text"
          value={negative}
          onChange={(e) => onNegativeChange(e.target.value)}
          placeholder="예: blurry, low quality, distorted"
          className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors placeholder:opacity-50"
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
    </div>
  );
}
