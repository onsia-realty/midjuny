'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContentTypeTab from '@/components/prompt/ContentTypeTab';
import SubjectInput from '@/components/prompt/SubjectInput';
import BasicOptions from '@/components/prompt/BasicOptions';
import ProOptions from '@/components/prompt/ProOptions';
import ParameterPanel from '@/components/prompt/ParameterPanel';
import V7RefPanel from '@/components/prompt/V7RefPanel';
import GenerateButton from '@/components/prompt/GenerateButton';
import ResultBox from '@/components/result/ResultBox';
import PromptSegments from '@/components/result/PromptSegments';
import ActionButtons from '@/components/result/ActionButtons';
import RatingStars from '@/components/result/RatingStars';
import PresetList from '@/components/preset/PresetList';
import PresetEditor from '@/components/preset/PresetEditor';
import HistoryPanel from '@/components/history/HistoryPanel';
import StatsView from '@/components/history/StatsView';
import Toggle from '@/components/ui/Toggle';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { usePromptEngine } from '@/hooks/usePromptEngine';
import { useHistory } from '@/hooks/useHistory';
import { usePresets } from '@/hooks/usePresets';
import { useLearning } from '@/hooks/useLearning';
import type { PromptHistory } from '@/types/prompt';
import { Settings2, Plus } from 'lucide-react';

function MainApp() {
  const engine = usePromptEngine();
  const historyHook = useHistory();
  const presetsHook = usePresets();
  const learningHook = useLearning();
  const { showToast } = useToast();

  const [savedId, setSavedId] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [showPresetEditor, setShowPresetEditor] = useState(false);

  // 프롬프트 생성
  const handleGenerate = useCallback(() => {
    const output = engine.generate();
    if (output) {
      setSavedId(null);
      setCurrentRating(0);
      showToast('프롬프트가 생성되었습니다!', 'success');
    }
  }, [engine, showToast]);

  // 히스토리에 저장
  const handleSave = useCallback(() => {
    if (!engine.state.output) return;
    const id = historyHook.saveToHistory(
      {
        subject: engine.state.subject,
        contentType: engine.state.contentType,
        usageType: engine.state.usageType,
        characterType: engine.state.characterType,
        tone: engine.state.tone,
        aspectRatio: engine.state.aspectRatio,
        proOptions: engine.state.proMode ? engine.state.proOptions : undefined,
      },
      engine.state.output
    );
    setSavedId(id);
    showToast('히스토리에 저장되었습니다', 'success');
  }, [engine.state, historyHook, showToast]);

  // 즐겨찾기 토글
  const handleFavorite = useCallback(() => {
    if (!savedId) {
      // 먼저 저장 후 즐겨찾기
      if (!engine.state.output) return;
      const id = historyHook.saveToHistory(
        {
          subject: engine.state.subject,
          contentType: engine.state.contentType,
          usageType: engine.state.usageType,
          characterType: engine.state.characterType,
          tone: engine.state.tone,
          aspectRatio: engine.state.aspectRatio,
          proOptions: engine.state.proMode ? engine.state.proOptions : undefined,
        },
        engine.state.output
      );
      setSavedId(id);
      historyHook.toggleFavorite(id);
    } else {
      historyHook.toggleFavorite(savedId);
    }
    showToast('즐겨찾기 상태가 변경되었습니다', 'info');
  }, [savedId, engine.state, historyHook, showToast]);

  // 평가
  const handleRate = useCallback((rating: number) => {
    setCurrentRating(rating);
    if (savedId) {
      historyHook.rateEntry(savedId, rating);
    }
  }, [savedId, historyHook]);

  // 프리셋 적용
  const handleApplyPreset = useCallback((id: string) => {
    const preset = presetsHook.applyPreset(id);
    if (!preset) return;

    engine.setContentType(preset.contentType);
    // setTimeout to allow content type state to settle
    setTimeout(() => {
      engine.setUsageType(preset.settings.usageType);
      engine.setCharacterType(preset.settings.characterType);
      engine.setTone(preset.settings.tone);
      engine.setAspectRatio(preset.settings.aspectRatio);

      if (preset.settings.camera || preset.settings.lighting || preset.settings.colorGrading) {
        engine.setProMode(true);
        if (preset.settings.camera) engine.setProOption('camera', preset.settings.camera);
        if (preset.settings.lighting) engine.setProOption('lighting', preset.settings.lighting);
        if (preset.settings.colorGrading) engine.setProOption('colorGrading', preset.settings.colorGrading);
        if (preset.settings.motion) engine.setProOption('motion', preset.settings.motion);
        engine.setProOption('stylize', preset.settings.stylize);
        engine.setProOption('chaos', preset.settings.chaos);
        if (preset.settings.negative) engine.setProOption('negative', preset.settings.negative);
      }
    }, 50);

    showToast(`프리셋 "${preset.name}" 적용됨`, 'success');
  }, [presetsHook, engine, showToast]);

  // 히스토리 항목 적용
  const handleApplyHistory = useCallback((item: PromptHistory) => {
    engine.setSubject(item.input.subject);
    engine.setContentType(item.input.contentType);
    setTimeout(() => {
      engine.setUsageType(item.input.usageType);
      engine.setCharacterType(item.input.characterType);
      engine.setTone(item.input.tone);
      engine.setAspectRatio(item.input.aspectRatio);
    }, 50);
    showToast('히스토리 항목이 입력에 적용되었습니다', 'info');
  }, [engine, showToast]);

  const isFavorited = savedId
    ? historyHook.favorites.some(f => f.id === savedId)
    : false;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        contentType={engine.state.contentType}
        onContentTypeChange={engine.setContentType}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* === 왼쪽: 입력 패널 === */}
          <div className="space-y-4">
            <ContentTypeTab contentType={engine.state.contentType} />

            <SubjectInput
              value={engine.state.subject}
              onChange={engine.setSubject}
              contentType={engine.state.contentType}
            />

            <BasicOptions
              contentType={engine.state.contentType}
              usageType={engine.state.usageType}
              characterType={engine.state.characterType}
              tone={engine.state.tone}
              aspectRatio={engine.state.aspectRatio}
              onUsageTypeChange={engine.setUsageType}
              onCharacterTypeChange={engine.setCharacterType}
              onToneChange={engine.setTone}
              onAspectRatioChange={engine.setAspectRatio}
            />

            {/* Pro Mode 토글 */}
            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-card)]">
              <Toggle
                label="Pro Mode"
                checked={engine.state.proMode}
                onChange={engine.setProMode}
                description="카메라, 렌즈, 조명, 컬러를 직접 선택합니다"
              />
            </div>

            {/* Pro Options */}
            {engine.state.proMode && (
              <div className="p-4 rounded-lg border border-[var(--accent-secondary)]/30 bg-[var(--accent-secondary)]/5 space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent-secondary)]">
                  <Settings2 size={14} />
                  <span>Pro Options</span>
                </div>

                <ProOptions
                  contentType={engine.state.contentType}
                  proOptions={engine.state.proOptions}
                  onProOptionChange={engine.setProOption}
                />

                <ParameterPanel
                  stylize={engine.state.proOptions.stylize}
                  chaos={engine.state.proOptions.chaos || 0}
                  negative={engine.state.proOptions.negative || ''}
                  onStylizeChange={(v) => engine.setProOption('stylize', v)}
                  onChaosChange={(v) => engine.setProOption('chaos', v)}
                  onNegativeChange={(v) => engine.setProOption('negative', v)}
                />

                <V7RefPanel
                  sref={engine.state.proOptions.sref || ''}
                  cref={engine.state.proOptions.cref || ''}
                  oref={engine.state.proOptions.oref || ''}
                  onSrefChange={(v) => engine.setProOption('sref', v)}
                  onCrefChange={(v) => engine.setProOption('cref', v)}
                  onOrefChange={(v) => engine.setProOption('oref', v)}
                />
              </div>
            )}

            <GenerateButton
              onGenerate={handleGenerate}
              onReset={engine.reset}
              disabled={!engine.state.subject.trim()}
              contentType={engine.state.contentType}
            />
          </div>

          {/* === 오른쪽: 결과 패널 === */}
          <div className="space-y-4">
            <ResultBox
              output={engine.state.output}
              contentType={engine.state.contentType}
            />

            {engine.state.output && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <ActionButtons
                    promptText={engine.state.output?.fullPrompt || null}
                    onRegenerate={() => {
                      engine.regenerate();
                      showToast('프롬프트가 재생성되었습니다', 'info');
                    }}
                    onSave={handleSave}
                    onFavorite={handleFavorite}
                    isFavorite={isFavorited}
                    isSaved={!!savedId}
                  />
                  <RatingStars
                    rating={currentRating}
                    onRate={handleRate}
                    size={16}
                  />
                </div>

                <PromptSegments
                  segments={engine.state.output?.segments || null}
                  contentType={engine.state.contentType}
                />
              </div>
            )}

            {/* 프리셋 목록 */}
            <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-card)]">
              <PresetList
                presets={presetsHook.presets}
                contentType={engine.state.contentType}
                onApply={handleApplyPreset}
                onDelete={presetsHook.removePreset}
              />
              <button
                onClick={() => setShowPresetEditor(true)}
                className="w-full mt-2 flex items-center justify-center gap-1.5 px-3 py-2
                           rounded-lg border border-dashed border-[var(--border)]
                           text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]
                           hover:border-[var(--border-active)] hover:bg-[var(--bg-hover)] transition-all"
              >
                <Plus size={12} /> 현재 설정을 프리셋으로 저장
              </button>
            </div>

            {/* 통계 */}
            <StatsView data={learningHook.learningData} />
          </div>
        </div>
      </main>

      {/* 히스토리 패널 */}
      <HistoryPanel
        history={historyHook.history}
        favorites={historyHook.favorites}
        onRate={historyHook.rateEntry}
        onToggleFavorite={historyHook.toggleFavorite}
        onDelete={historyHook.deleteEntry}
        onClear={historyHook.clearHistory}
        onApply={handleApplyHistory}
      />

      <Footer />

      {/* 프리셋 에디터 모달 */}
      <PresetEditor
        isOpen={showPresetEditor}
        onClose={() => setShowPresetEditor(false)}
        onSave={presetsHook.createPreset}
        contentType={engine.state.contentType}
        currentSettings={{
          usageType: engine.state.usageType,
          characterType: engine.state.characterType,
          tone: engine.state.tone,
          aspectRatio: engine.state.aspectRatio,
          proOptions: engine.state.proOptions,
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
