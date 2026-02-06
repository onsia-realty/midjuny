// Subject parser - intelligently extracts subject, action, background from Korean input

export interface ParsedSubject {
  subject: string;    // 핵심 주체 (누가/무엇이)
  action: string;     // 행동/소품 (무엇을 하며)
  background: string; // 배경/장소 (어디서)
  atmosphere: string; // 분위기/조명 힌트
}

// === 한→영 사전 ===

const SUBJECT_KEYWORDS: Record<string, string> = {
  // People
  '여성': 'woman',
  '남성': 'man',
  '커플': 'couple',
  '가족': 'family',
  '어린이': 'child',
  '아이': 'child',
  '신혼부부': 'newlywed couple',
  '신혼': 'newlywed',
  '전문가': 'expert',
  '중개사': 'real estate agent',
  '공인중개사': 'certified real estate agent',
  '사업가': 'businessman',
  '디자이너': 'designer',
  '건축가': 'architect',
  '모델': 'model',

  // Appearance
  '정장': 'wearing a sharp suit',
  '수트': 'wearing a tailored suit',
  '네이비': 'navy',
  '차콜': 'charcoal',
  '캐주얼': 'casual outfit',
  '비즈니스': 'business attire',
  '단정한': 'neat and polished',
  '세련된': 'sophisticated',
  '자신감': 'confident',
  '전문적인': 'professional-looking',

  // Expressions
  '미소': 'with a warm smile',
  '웃는': 'smiling',
  '웃으며': 'smiling',
  '감탄': 'with an amazed expression',
  '감탄하는': 'looking amazed',
  '진지한': 'with a serious focused expression',
  '자신감있는': 'with a confident expression',
  '밝은': 'bright cheerful',
};

const ACTION_KEYWORDS: Record<string, string> = {
  // Tech / work actions
  '부동산 데이터를 분석하며': 'analyzing real estate data',
  '데이터를 분석하며': 'analyzing data',
  '데이터를 분석하는': 'analyzing data',
  '태블릿으로': 'holding and looking at a tablet',
  '태블릿을': 'holding a tablet',
  '태블릿': 'holding a tablet',
  '노트북으로': 'working on a laptop',
  '노트북을': 'using a laptop',
  '노트북': 'laptop',
  '스마트폰으로': 'looking at a smartphone',
  '스마트폰을': 'holding a smartphone',
  '폰을': 'holding a phone',
  '분석하며': 'analyzing',
  '분석하는': 'analyzing',
  '분석': 'analyzing',
  '데이터를': '',
  '데이터': '',
  '설명하는': 'explaining and presenting',
  '설명하며': 'while explaining',
  '프레젠테이션': 'giving a presentation',
  '발표하는': 'presenting',

  // Real estate actions
  '상담하는': 'consulting with clients',
  '상담하며': 'while consulting',
  '상담': 'consulting',
  '계약하는': 'signing a contract',
  '계약서에': 'on a contract document',
  '계약': 'contract signing',
  '서명하는': 'signing documents',
  '서명': 'signing',
  '투어하는': 'giving a property tour',
  '안내하는': 'guiding through the space',
  '집을 보여주는': 'showing a home',
  '열쇠를 건네는': 'handing over keys',

  // General actions
  '걷는': 'walking',
  '걸으며': 'while walking',
  '앉아있는': 'sitting',
  '앉은': 'sitting',
  '서있는': 'standing',
  '서서': 'standing',
  '바라보는': 'gazing at',
  '바라보며': 'while looking at',
  '들고있는': 'holding',
  '들고': 'holding',
  '보고있는': 'looking at',
  '보며': 'while looking at',
  '손을 흔드는': 'waving hand',
  '악수하는': 'shaking hands',
  '포즈': 'posing',

  // Props / effects
  '떠있는 은은한 홀로그램 데이터 시각화': 'with subtle glowing holographic data visualization floating above',
  '홀로그램 데이터 시각화': 'with holographic data visualization floating above',
  '홀로그램': 'with subtle holographic visualizations',
  '홀로그래픽': 'with holographic display',
  '데이터 시각화': 'with data visualization charts floating above',
  '시각화': 'with visualization',
  '떠있는': '',  // usually captured by compound phrases above
  '차트': 'charts and graphs',
  '그래프': 'graphs',
  '화면': 'screen display',
};

const BACKGROUND_KEYWORDS: Record<string, string> = {
  // Office / indoor
  '글래스 월 오피스': 'modern glass wall office',
  '글래스월 오피스': 'modern glass wall office',
  '유리벽 오피스': 'modern glass wall office',
  '오피스': 'modern office',
  '사무실': 'office',
  '회의실': 'conference room',
  '회의실에서': 'in a conference room',
  '사무실에서': 'in an office',

  // Real estate / building
  '모델하우스': 'model house showroom',
  '모델하우스에서': 'in a model house showroom',
  '로비': 'grand lobby',
  '로비에서': 'in a grand lobby',
  '펜트하우스': 'penthouse',
  '펜트하우스에서': 'in a penthouse',
  '주상복합': 'mixed-use residential tower',
  '아파트': 'apartment',
  '아파트에서': 'in an apartment',
  '분양사무실': 'sales office',
  '분양현장': 'pre-sale site',

  // Living spaces
  '거실': 'spacious living room',
  '거실에서': 'in a spacious living room',
  '주방': 'modern kitchen',
  '주방에서': 'in a modern kitchen',
  '침실': 'bedroom',
  '욕실': 'luxurious bathroom',
  '서재': 'study room',
  '드레스룸': 'walk-in closet',
  '인테리어': 'interior',

  // Outdoor
  '옥상': 'rooftop terrace',
  '옥상에서': 'on a rooftop terrace',
  '발코니': 'balcony',
  '발코니에서': 'on a balcony',
  '테라스': 'terrace',
  '정원': 'garden',
  '공원': 'park',
  '강변': 'riverside',
  '한강': 'Han River',
  '도심': 'city downtown',
  '도시': 'city',

  // Views
  '한강뷰': 'Han River view',
  '시티뷰': 'city skyline view',
  '야경': 'night city lights',
  '도시 야경': 'city night view',
  '일몰': 'sunset',
  '석양': 'golden hour sunset',
  '바다뷰': 'ocean view',
  '산뷰': 'mountain view',
};

const ATMOSPHERE_KEYWORDS: Record<string, string> = {
  // Lighting mood
  '미래지향적': 'futuristic',
  '미래지향적인': 'futuristic',
  '하이테크': 'high-tech',
  '네온': 'neon glow',
  '사이버펑크': 'cyberpunk',

  // Color mood
  '딥 블루': 'deep blue',
  '화이트 톤': 'crisp white tones',
  '블루 톤': 'blue tones',
  '골드 톤': 'golden tones',
  '웜톤': 'warm tones',
  '쿨톤': 'cool tones',

  // Atmosphere
  '은은한': 'subtle soft',
  '고급스러운': 'luxurious elegant',
  '세련된': 'sophisticated refined',
  '따뜻한': 'warm cozy',
  '차가운': 'cool crisp',
  '모던한': 'modern clean',
  '클래식한': 'classic timeless',
  '신뢰감있는': 'trustworthy',
  '신뢰감': 'trustworthy',
  '역동적인': 'dynamic energetic',
  '평화로운': 'peaceful serene',
  '드라마틱한': 'dramatic',
};

// Extra general keywords for anything that doesn't fit above
const GENERAL_KEYWORDS: Record<string, string> = {
  '고급': 'luxury',
  '대형': 'spacious large',
  '소형': 'compact',
  '신축': 'newly built',
  '리모델링': 'remodeled',
  '부동산': 'real estate',
  '분양': 'pre-sale',
  '건물': 'building',
  '통유리': 'floor-to-ceiling windows',
  '대리석': 'marble',
  '원목': 'natural wood',
  '가구': 'furniture',
  '소파': 'sofa',
  '수영장': 'swimming pool',
  '엘리베이터': 'elevator',
  '뷰': 'view',
  '전망': 'panoramic view',
  '촬영': '',
  '사진': '',
  '영상': '',
  '현대적인': 'modern',
  '현대적': 'modern',
  '한국인': 'Korean',
  '조명': '',       // "lighting" - handled by atmosphere/lighting segments
  '톤의': '',       // particle "tone's" - often leftover connector
};

// Sort all dictionaries by key length descending
function sortedKeys(dict: Record<string, string>): string[] {
  return Object.keys(dict).sort((a, b) => b.length - a.length);
}

const SORTED_ATMOSPHERE = sortedKeys(ATMOSPHERE_KEYWORDS);
const SORTED_ACTION = sortedKeys(ACTION_KEYWORDS);
const SORTED_BACKGROUND = sortedKeys(BACKGROUND_KEYWORDS);
const SORTED_SUBJECT = sortedKeys(SUBJECT_KEYWORDS);
const SORTED_GENERAL = sortedKeys(GENERAL_KEYWORDS);

/**
 * Extract matching keywords from text, removing them as they're found.
 * Returns [extracted English phrases, remaining text]
 */
function extractAndRemove(
  text: string,
  sortedKeys: string[],
  dict: Record<string, string>
): [string[], string] {
  const found: string[] = [];
  let remaining = text;

  for (const key of sortedKeys) {
    if (remaining.includes(key)) {
      const eng = dict[key];
      if (eng) found.push(eng);
      remaining = remaining.split(key).join(' ');
    }
  }

  return [found, remaining.replace(/\s+/g, ' ').trim()];
}

/**
 * Parse Korean subject input into structured segments.
 * Intelligently separates: subject, action, background, atmosphere.
 */
export function parseSubject(subject: string, _characterType: string): string {
  const parsed = parseSubjectStructured(subject, _characterType);
  // Legacy: return combined subject for backward compatibility
  const parts = [parsed.subject, parsed.action, parsed.background, parsed.atmosphere]
    .filter(Boolean);
  return parts.join(', ');
}

/**
 * Full structured parse - returns separate segments.
 */
export function parseSubjectStructured(subject: string, _characterType: string): ParsedSubject {
  let text = subject;

  // 1. Extract atmosphere/mood keywords first (they modify other elements)
  const [atmosphereParts, afterAtmosphere] = extractAndRemove(text, SORTED_ATMOSPHERE, ATMOSPHERE_KEYWORDS);
  text = afterAtmosphere;

  // 2. Extract background/location
  const [backgroundParts, afterBackground] = extractAndRemove(text, SORTED_BACKGROUND, BACKGROUND_KEYWORDS);
  text = afterBackground;

  // 3. Extract action/activity
  const [actionParts, afterAction] = extractAndRemove(text, SORTED_ACTION, ACTION_KEYWORDS);
  text = afterAction;

  // 4. Extract subject descriptors
  const [subjectParts, afterSubject] = extractAndRemove(text, SORTED_SUBJECT, SUBJECT_KEYWORDS);
  text = afterSubject;

  // 5. Handle remaining general keywords
  const [generalParts, remaining] = extractAndRemove(text, SORTED_GENERAL, GENERAL_KEYWORDS);

  // 6. Any remaining Korean/English text goes to subject
  // Remove common Korean particles, connectors, punctuation, and single leftover characters
  const remainingClean = remaining
    .replace(/[에서으로를을의이가는며와과도에한된인적]/g, ' ')
    .replace(/[,.\s]+/g, ' ')
    .replace(/\b의\b/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    // Remove isolated single Korean characters (likely leftover particles)
    .replace(/(?:^|\s)[가-힣](?:\s|$)/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  // Build each segment
  const subjectAll = [...subjectParts, ...generalParts];
  if (remainingClean) subjectAll.push(remainingClean);
  const subjectStr = subjectAll.join(', ');

  // Deduplicate action parts (overlapping Korean keywords can produce duplicates)
  const actionStr = [...new Set(actionParts)].join(', ');
  const backgroundStr = [...new Set(backgroundParts)].join(', ');
  const atmosphereStr = [...new Set(atmosphereParts)].join(', ');

  return {
    subject: subjectStr,
    action: actionStr,
    background: backgroundStr,
    atmosphere: atmosphereStr,
  };
}
