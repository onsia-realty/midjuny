'use client';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  showValue?: boolean;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  showValue = true,
}: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
        {showValue && (
          <span
            className="text-sm font-mono tabular-nums"
            style={{ color: 'var(--text-primary)' }}
          >
            {value}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
      <div
        className="flex justify-between text-xs"
        style={{ color: 'var(--text-muted)' }}
      >
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
