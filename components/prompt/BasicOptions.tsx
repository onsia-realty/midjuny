'use client';

import Select from '@/components/ui/Select';
import type { ContentType } from '@/types/prompt';
import {
  USAGE_TYPES,
  CHARACTER_TYPES,
  TONES,
  AR_OPTIONS,
} from '@/lib/utils/constants';

interface BasicOptionsProps {
  contentType: ContentType;
  usageType: string;
  characterType: string;
  tone: string;
  aspectRatio: string;
  onUsageTypeChange: (v: string) => void;
  onCharacterTypeChange: (v: string) => void;
  onToneChange: (v: string) => void;
  onAspectRatioChange: (v: string) => void;
}

export default function BasicOptions({
  contentType,
  usageType,
  characterType,
  tone,
  aspectRatio,
  onUsageTypeChange,
  onCharacterTypeChange,
  onToneChange,
  onAspectRatioChange,
}: BasicOptionsProps) {
  const usageOptions = USAGE_TYPES[contentType].map((u) => ({
    id: u.id,
    label: u.label,
  }));

  const characterOptions = CHARACTER_TYPES.map((c) => ({
    id: c.id,
    label: c.label,
  }));

  const toneOptions = TONES.map((t) => ({
    id: t.id,
    label: t.label,
    desc: t.desc,
  }));

  const arOptions = AR_OPTIONS.map((a) => ({
    id: a.id,
    label: a.label,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Select
        label="용도 (Usage)"
        value={usageType}
        options={usageOptions}
        onChange={onUsageTypeChange}
      />
      <Select
        label="인물 유형 (Character)"
        value={characterType}
        options={characterOptions}
        onChange={onCharacterTypeChange}
      />
      <Select
        label="톤 (Tone)"
        value={tone}
        options={toneOptions}
        onChange={onToneChange}
      />
      <Select
        label="화면비 (Aspect Ratio)"
        value={aspectRatio}
        options={arOptions}
        onChange={onAspectRatioChange}
      />
    </div>
  );
}
