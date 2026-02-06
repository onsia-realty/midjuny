'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import type { ContentType, ProOptions } from '@/types/prompt';
import type { PresetSettings } from '@/types/preset';

interface PresetEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, contentType: ContentType, settings: PresetSettings) => void;
  contentType: ContentType;
  currentSettings: {
    usageType: string;
    characterType: string;
    tone: string;
    aspectRatio: string;
    proOptions: ProOptions;
  };
}

export default function PresetEditor({
  isOpen,
  onClose,
  onSave,
  contentType,
  currentSettings,
}: PresetEditorProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    const settings: PresetSettings = {
      usageType: currentSettings.usageType,
      characterType: currentSettings.characterType,
      tone: currentSettings.tone,
      aspectRatio: currentSettings.aspectRatio,
      camera: currentSettings.proOptions.camera || undefined,
      lighting: currentSettings.proOptions.lighting || undefined,
      colorGrading: currentSettings.proOptions.colorGrading || undefined,
      motion: currentSettings.proOptions.motion || undefined,
      stylize: currentSettings.proOptions.stylize,
      chaos: currentSettings.proOptions.chaos,
      negative: currentSettings.proOptions.negative || undefined,
    };
    onSave(name.trim(), description.trim(), contentType, settings);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="프리셋 저장">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              프리셋 이름 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 부동산 럭셔리 인테리어"
              maxLength={50}
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors placeholder:opacity-50"
              style={{
                backgroundColor: 'var(--bg-primary)',
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

          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              설명 (선택)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="프리셋에 대한 간단한 설명"
              maxLength={100}
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors placeholder:opacity-50"
              style={{
                backgroundColor: 'var(--bg-primary)',
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

          <div
            className="rounded-lg p-3 text-xs"
            style={{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            <p className="font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              저장될 설정:
            </p>
            <p>용도: {currentSettings.usageType}</p>
            <p>인물: {currentSettings.characterType}</p>
            <p>톤: {currentSettings.tone}</p>
            <p>화면비: {currentSettings.aspectRatio}</p>
            <p>Stylize: {currentSettings.proOptions.stylize}</p>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
              }}
            >
              저장
            </button>
          </div>
        </div>
    </Modal>
  );
}
