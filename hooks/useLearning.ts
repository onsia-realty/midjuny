'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LearningData } from '@/types/learning';
import { getLearningData } from '@/lib/storage/learningStore';

export function useLearning() {
  const [learningData, setLearningData] = useState<LearningData>({
    totalGenerated: 0,
    avgRating: 0,
    topCameras: {},
    topLighting: {},
    topColorGrading: {},
    keywordEffectiveness: {},
    contentTypeStats: {
      IMAGE: { count: 0, avgRating: 0, bestStylize: 200, bestChaos: 0 },
      VIDEO: { count: 0, avgRating: 0, bestStylize: 250, bestChaos: 0 },
      SHORTFORM: { count: 0, avgRating: 0, bestStylize: 400, bestChaos: 0 },
    },
  });

  const refresh = useCallback(() => {
    setLearningData(getLearningData());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { learningData, refresh };
}
