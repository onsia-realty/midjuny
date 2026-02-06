'use client';

import { BarChart3, Star, Image, Video, Zap } from 'lucide-react';
import type { LearningData } from '@/types/learning';

interface StatsViewProps {
  data: LearningData;
}

export default function StatsView({ data }: StatsViewProps) {
  if (data.totalGenerated === 0) {
    return null;
  }

  const topCamera = getTopEntries(data.topCameras, 3);
  const topLighting = getTopEntries(data.topLighting, 3);

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={14} style={{ color: 'var(--accent-secondary)' }} />
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--text-secondary)' }}
        >
          사용 통계
        </h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <StatCard label="총 생성" value={`${data.totalGenerated}회`} />
        <StatCard
          label="평균 평점"
          value={data.avgRating > 0 ? data.avgRating.toFixed(1) : '-'}
          icon={<Star size={10} fill="var(--accent-warning)" style={{ color: 'var(--accent-warning)' }} />}
        />
      </div>

      {/* Content Type Stats */}
      <div className="flex flex-col gap-1.5 mb-3">
        <ContentStat
          icon={<Image size={10} />}
          label="IMAGE"
          count={data.contentTypeStats.IMAGE?.count ?? 0}
          color="var(--color-image)"
        />
        <ContentStat
          icon={<Video size={10} />}
          label="VIDEO"
          count={data.contentTypeStats.VIDEO?.count ?? 0}
          color="var(--color-video)"
        />
        <ContentStat
          icon={<Zap size={10} />}
          label="SHORTFORM"
          count={data.contentTypeStats.SHORTFORM?.count ?? 0}
          color="var(--color-shortform)"
        />
      </div>

      {/* Top Used */}
      {topCamera.length > 0 && (
        <div className="mb-2">
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
            자주 사용한 카메라
          </p>
          {topCamera.map(([key, count]) => (
            <div key={key} className="flex items-center justify-between text-xs py-0.5">
              <span style={{ color: 'var(--text-secondary)' }}>
                {key.replace(/_/g, ' ')}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{count}회</span>
            </div>
          ))}
        </div>
      )}

      {topLighting.length > 0 && (
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
            자주 사용한 라이팅
          </p>
          {topLighting.map(([key, count]) => (
            <div key={key} className="flex items-center justify-between text-xs py-0.5">
              <span style={{ color: 'var(--text-secondary)' }}>
                {key.replace(/_/g, ' ')}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{count}회</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border)',
      }}
    >
      <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <div className="flex items-center gap-1">
        {icon}
        <span
          className="text-sm font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function ContentStat({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span style={{ color }}>{icon}</span>
      <span style={{ color }} className="font-medium w-16">
        {label}
      </span>
      <span style={{ color: 'var(--text-muted)' }}>{count}회</span>
    </div>
  );
}

function getTopEntries(obj: Record<string, number>, limit: number): [string, number][] {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
}
