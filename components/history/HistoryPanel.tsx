'use client';

import { useState } from 'react';
import { Clock, Heart, Trash2, ChevronDown, ChevronUp, Copy, Star, ArrowUpRight } from 'lucide-react';
import type { PromptHistory } from '@/types/prompt';

interface HistoryPanelProps {
  history: PromptHistory[];
  favorites: PromptHistory[];
  onRate: (id: string, rating: number) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  onApply: (item: PromptHistory) => void;
}

export default function HistoryPanel({
  history,
  favorites,
  onRate,
  onToggleFavorite,
  onDelete,
  onClear,
  onApply,
}: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'all' | 'favorites'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const items = tab === 'favorites' ? favorites : history;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div
      className="border-t"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      {/* Toggle Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 transition-colors"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm font-medium">히스토리</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            ({history.length})
          </span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {/* Panel Content */}
      {isOpen && (
        <div className="px-4 pb-4 animate-fadeIn">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => setTab('all')}
              className="text-sm font-medium pb-1 transition-colors"
              style={{
                color: tab === 'all' ? 'var(--accent-primary)' : 'var(--text-muted)',
                borderBottom: tab === 'all' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              }}
            >
              전체 ({history.length})
            </button>
            <button
              onClick={() => setTab('favorites')}
              className="text-sm font-medium pb-1 transition-colors"
              style={{
                color: tab === 'favorites' ? '#ef4444' : 'var(--text-muted)',
                borderBottom: tab === 'favorites' ? '2px solid #ef4444' : '2px solid transparent',
              }}
            >
              즐겨찾기 ({favorites.length})
            </button>

            {history.length > 0 && (
              <button
                onClick={onClear}
                className="ml-auto text-xs transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                전체 삭제
              </button>
            )}
          </div>

          {/* List */}
          {items.length === 0 ? (
            <p className="text-xs text-center py-6" style={{ color: 'var(--text-muted)' }}>
              {tab === 'favorites' ? '즐겨찾기가 없습니다' : '생성 기록이 없습니다'}
            </p>
          ) : (
            <div
              className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1"
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg p-3 transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {/* Prompt text */}
                  <p
                    className="text-xs font-mono-prompt leading-relaxed line-clamp-2 mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.output.fullPrompt}
                  </p>

                  {/* Meta & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {item.rating > 0 && (
                        <div className="flex items-center gap-0.5">
                          <Star size={10} fill="var(--accent-warning)" style={{ color: 'var(--accent-warning)' }} />
                          <span className="text-xs" style={{ color: 'var(--accent-warning)' }}>
                            {item.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(item.output.fullPrompt, item.id)}
                        className="rounded p-1 transition-colors"
                        style={{ color: copiedId === item.id ? 'var(--accent-success)' : 'var(--text-muted)' }}
                        title="복사"
                      >
                        <Copy size={12} />
                      </button>
                      <button
                        onClick={() => onApply(item)}
                        className="rounded p-1 transition-colors"
                        style={{ color: 'var(--accent-primary)' }}
                        title="입력에 적용"
                      >
                        <ArrowUpRight size={12} />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className="rounded p-1 transition-colors"
                        style={{ color: item.isFavorite ? '#ef4444' : 'var(--text-muted)' }}
                        title="즐겨찾기"
                      >
                        <Heart size={12} fill={item.isFavorite ? '#ef4444' : 'none'} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="rounded p-1 transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                        title="삭제"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
