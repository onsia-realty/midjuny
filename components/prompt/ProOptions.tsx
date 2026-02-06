'use client';

import Select from '@/components/ui/Select';
import type { ContentType, ProOptions as ProOptionsType } from '@/types/prompt';
import { CAMERA_DB } from '@/lib/database/cameras';
import { LIGHTING_DB } from '@/lib/database/lighting';
import { COLOR_GRADING_DB } from '@/lib/database/colorGrading';
import { VIDEO_MOTION_DB, SHORTFORM_MOTION_DB } from '@/lib/database/motions';

interface ProOptionsProps {
  contentType: ContentType;
  proOptions: ProOptionsType;
  onProOptionChange: (key: string, value: any) => void;
}

export default function ProOptions({
  contentType,
  proOptions,
  onProOptionChange,
}: ProOptionsProps) {
  const cameraOptions = Object.keys(CAMERA_DB).map((key) => ({
    id: key,
    label: `${CAMERA_DB[key].model} (${CAMERA_DB[key].lens})`,
  }));

  const lightingOptions = Object.keys(LIGHTING_DB).map((key) => ({
    id: key,
    label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    desc: LIGHTING_DB[key].category,
  }));

  const colorGradingOptions = Object.keys(COLOR_GRADING_DB).map((key) => ({
    id: key,
    label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    desc: COLOR_GRADING_DB[key].description,
  }));

  const motionDB =
    contentType === 'VIDEO' ? VIDEO_MOTION_DB : SHORTFORM_MOTION_DB;
  const motionOptions = Object.keys(motionDB).map((key) => ({
    id: key,
    label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    desc: motionDB[key].description,
  }));

  return (
    <div className="flex flex-col gap-4">
      <h3
        className="text-sm font-semibold"
        style={{ color: 'var(--text-secondary)' }}
      >
        Pro Options
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="카메라 (Camera)"
          value={proOptions.camera}
          options={cameraOptions}
          onChange={(v) => onProOptionChange('camera', v)}
        />
        <Select
          label="라이팅 (Lighting)"
          value={proOptions.lighting}
          options={lightingOptions}
          onChange={(v) => onProOptionChange('lighting', v)}
        />
        <Select
          label="컬러 그레이딩 (Color Grading)"
          value={proOptions.colorGrading}
          options={colorGradingOptions}
          onChange={(v) => onProOptionChange('colorGrading', v)}
        />
        {contentType !== 'IMAGE' && (
          <Select
            label="모션 (Motion)"
            value={proOptions.motion}
            options={motionOptions}
            onChange={(v) => onProOptionChange('motion', v)}
          />
        )}
      </div>
    </div>
  );
}
