// Subject parser - converts Korean subject input to English using keyword mapping

const KOREAN_TO_ENGLISH: Record<string, string> = {
  // Spaces & buildings
  '고급': 'luxury',
  '사무실': 'office',
  '거실': 'living room',
  '아파트': 'apartment',
  '한강': 'Han River',
  '인테리어': 'interior',
  '건물': 'building',
  '공원': 'park',
  '부동산': 'real estate',
  '상담': 'consulting',
  '계약': 'contract',
  '서명': 'signing',
  '모델하우스': 'model house',
  '분양': 'pre-sale',
  '주상복합': 'mixed-use residential',
  '로비': 'lobby',
  '엘리베이터': 'elevator',
  '옥상': 'rooftop',
  '발코니': 'balcony',
  '테라스': 'terrace',
  '카페': 'cafe',
  '레스토랑': 'restaurant',

  // Media & photography
  '사진': 'photo',
  '영상': 'video',
  '촬영': 'shooting',
  '중개사': 'real estate agent',

  // Size & condition
  '대형': 'spacious large',
  '소형': 'compact small',
  '신축': 'newly built',
  '리모델링': 'remodeled renovated',

  // Views & scenery
  '전망': 'view',
  '뷰': 'view',
  '야경': 'night view',
  '일출': 'sunrise',
  '일몰': 'sunset',
  '석양': 'golden hour sunset',
  '강변': 'riverside',
  '바다': 'ocean sea',
  '산': 'mountain',
  '도심': 'city downtown',
  '도시': 'city urban',
  '시골': 'countryside rural',
  '마을': 'village',
  '숲': 'forest',
  '정원': 'garden',

  // Amenities
  '수영장': 'swimming pool',
  '헬스장': 'fitness gym',
  '놀이터': 'playground',
  '주차장': 'parking lot',

  // Architectural elements
  '창문': 'window',
  '통유리': 'floor-to-ceiling window',
  '현관': 'entrance',
  '복도': 'hallway corridor',
  '계단': 'staircase',
  '천장': 'ceiling',
  '벽': 'wall',
  '바닥': 'floor',

  // Materials & finishes
  '마감': 'finishing',
  '대리석': 'marble',
  '원목': 'natural wood',
  '타일': 'tile',
  '커튼': 'curtain',
  '조명': 'lighting',

  // Furniture
  '가구': 'furniture',
  '소파': 'sofa',
  '침대': 'bed',
  '책상': 'desk',
  '의자': 'chair',
  '테이블': 'table',

  // Rooms
  '주방': 'kitchen',
  '욕실': 'bathroom',
  '침실': 'bedroom',
  '서재': 'study room',
  '드레스룸': 'walk-in closet dressing room',

  // People & actions
  '여성': 'female woman',
  '남성': 'male man',
  '커플': 'couple',
  '가족': 'family',
  '어린이': 'child children',
  '신혼': 'newlywed',
  '감탄': 'amazed expression',
  '미소': 'smile',
  '웃는': 'smiling',
  '걷는': 'walking',
  '앉은': 'sitting',
  '서있는': 'standing',
};

// Sort keys by length descending so longer matches take priority
const SORTED_KOREAN_KEYS = Object.keys(KOREAN_TO_ENGLISH).sort(
  (a, b) => b.length - a.length
);

export function parseSubject(subject: string, _characterType: string): string {
  let result = subject;

  for (const koreanWord of SORTED_KOREAN_KEYS) {
    if (result.includes(koreanWord)) {
      result = result.split(koreanWord).join(KOREAN_TO_ENGLISH[koreanWord]);
    }
  }

  // Clean up any extra whitespace from replacements
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}
