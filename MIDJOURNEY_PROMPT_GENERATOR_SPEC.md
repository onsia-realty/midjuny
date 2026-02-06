# 🎯 Midjourney Pro Prompt Generator — 개발 명세서 v2.0

> **목적**: 부동산 마케팅 + 콘텐츠 제작 전문 Midjourney 프롬프트 자동 생성기
> **실행환경**: Windows 10/11 로컬 (npm run dev)
> **대상 버전**: Midjourney V7 (기본) / V6.1 (하위호환)
> **최종 업데이트**: 2026-02-06

---

## 📌 프로젝트 핵심 철학

```
"초급자 프롬프트가 아닌, 프로 포토그래퍼 수준의 프롬프트를 한국어 입력만으로 자동 생성"
```

### 기존 프롬프트 빌더 vs 이 프로젝트의 차이점

| 기존 (초급) | 이 프로젝트 (고급) |
|------------|-------------------|
| `photorealistic, 8k, ultra detailed` | ❌ V6+에서 junk 키워드 — 사용하지 않음 |
| `85mm lens` 한 줄 | `Canon EOS 5D Mark IV, 85mm f/1.8, shallow depth of field` |
| 고정 파라미터 | 콘텐츠 타입별 자동 최적화 파라미터 |
| 영어 프롬프트 복붙 | 한국어 → 맥락 분석 → 전문 영어 프롬프트 |
| 업데이트 불가 | 사용자 커스텀 키워드 DB + 프리셋 학습 |

---

## 1. 기술 스택

```yaml
Framework: Next.js 14+ (App Router)
Language: TypeScript (strict mode)
Styling: Tailwind CSS 3.4+
Font: Pretendard (한글) + JetBrains Mono (코드/프롬프트)
Storage: LocalStorage (IndexedDB 확장 가능)
Icons: Lucide React
Animation: Framer Motion
Deployment: 로컬 실행 (npm run dev)
Node.js: 20 LTS+
```

---

## 2. 콘텐츠 타입 시스템 (핵심 분류)

### 3가지 대분류

프롬프트 생성 로직이 콘텐츠 타입에 따라 **완전히 달라져야** 함:

```typescript
type ContentType = 'IMAGE' | 'VIDEO' | 'SHORTFORM';
```

#### A. IMAGE (정지 이미지)
```
용도: 랜딩페이지, 블로그, 배너, 인스타그램, 썸네일
특성: 정적 구도, 선명한 디테일, 고해상도 최적화
파라미터: --ar, --s, --chaos, --no, --seed
V7 추가: --oref, --sref, --cref
```

#### B. VIDEO (영상 생성)
```
용도: 유튜브 인트로, 부동산 투어 영상, 광고 영상
특성: 카메라 무빙, 시네마틱 모션, 장면 전환
파라미터: --ar 16:9 (기본), --s, --v 7
V7 전용: 최대 21초 영상 생성 지원
모션 키워드: tracking shot, crane shot, dolly zoom, FPV drone, orbital shot
```

#### C. SHORTFORM (숏폼 특화)
```
용도: 릴스, 쇼츠, 틱톡
특성: 세로 비율, 빠른 시선 집중, 강렬한 색감
파라미터: --ar 9:16, --s 300+, --chaos 10-25
모션 키워드: dynamic pose, slight wind, hair movement, fabric flowing
컬러: 고채도, 대비 강한 컬러 그레이딩
```

---

## 3. 프롬프트 생성 엔진 구조

### 최종 프롬프트 출력 형식 (8단계)

```
[1. Subject & Scene Description]
[2. Character Detail & Styling]
[3. Camera Model & Lens Specification]
[4. Shot Type & Composition]
[5. Lighting & Atmosphere]
[6. Color Grading & Mood]
[7. Motion & Dynamic] ← VIDEO/SHORTFORM 전용
[8. Parameters]
```

### 각 단계 상세 규칙

#### STEP 1: Subject & Scene Description
```
규칙:
- 한국어 입력을 영어로 번역하되, Midjourney가 이해하는 자연어 서술로 변환
- 주어 + 행동 + 장소 순서
- 구체적 형용사 사용 (vague한 표현 금지)

예시:
입력: "고급 사무실에서 상담하는 여성 공인중개사"
출력: "Professional Korean female real estate agent consulting with a client in a luxury modern office"

입력: "한강뷰 아파트 거실"
출력: "Spacious living room interior with floor-to-ceiling windows overlooking Han River at sunset"
```

#### STEP 2: Character Detail & Styling
```
규칙:
- Character Type이 "No Person"이면 이 단계 스킵
- 의상은 톤에 맞게 자동 선택
- 표정과 포즈 자동 추가

자동 매칭 테이블:
┌─────────────┬──────────────────────────────────────────┐
│ Tone        │ Character Styling                         │
├─────────────┼──────────────────────────────────────────┤
│ Professional│ neat navy/charcoal suit, confident smile  │
│ Luxury      │ tailored designer outfit, elegant pose    │
│ Friendly    │ smart casual, warm genuine smile          │
│ Modern      │ contemporary minimalist outfit, relaxed   │
│ Cinematic   │ dramatic styling, intense gaze            │
│ Warm        │ earth-tone outfit, natural expression     │
│ Energetic   │ bright colors, dynamic pose               │
└─────────────┴──────────────────────────────────────────┘
```

#### STEP 3: Camera Model & Lens Specification (V7 고급 핵심)
```
규칙:
- V6 이하의 "85mm lens" 같은 단순 표기 X
- 실제 카메라 모델 + 렌즈 초점거리 + 조리개값 명시
- 콘텐츠 타입 + 피사체에 따라 자동 선택

자동 매칭 로직:

인물 중심 (포트레이트):
  → "shot with Canon EOS 5D Mark IV, 85mm f/1.8, shallow depth of field"

인물 + 환경 (환경 포트레이트):
  → "shot with Sony A7R IV, 50mm f/2.0, natural depth"

건물 외관:
  → "shot with Nikon D850, 24mm f/8, wide-angle, deep focus"

인테리어:
  → "shot with Sony A7 III, 16-35mm f/2.8, wide-angle interior"

항공뷰 / 드론:
  → "DJI Mavic 3 aerial shot, 24mm equivalent, f/2.8"

제품 / 클로즈업:
  → "shot with Canon EOS R5, 100mm macro f/2.8, studio lighting"

숏폼 / 다이나믹:
  → "shot with Sony FX6, 35mm f/1.4, cinematic motion"

풍경 / 와이드:
  → "shot with Fujifilm GFX 100S, 32-64mm f/4, landscape"
```

#### Camera Model Database
```typescript
const CAMERA_DB = {
  portrait: {
    model: "Canon EOS 5D Mark IV",
    lens: "85mm f/1.8",
    style: "shallow depth of field, creamy bokeh"
  },
  environmental_portrait: {
    model: "Sony A7R IV",
    lens: "50mm f/2.0",
    style: "natural depth, environmental context"
  },
  architecture_exterior: {
    model: "Nikon D850",
    lens: "24mm f/8",
    style: "wide-angle, deep focus, architectural precision"
  },
  architecture_interior: {
    model: "Sony A7 III",
    lens: "16-35mm f/2.8",
    style: "wide-angle interior, natural perspective"
  },
  aerial: {
    model: "DJI Mavic 3",
    lens: "24mm equivalent f/2.8",
    style: "aerial perspective, vast scale"
  },
  product: {
    model: "Canon EOS R5",
    lens: "100mm macro f/2.8",
    style: "sharp detail, controlled lighting"
  },
  cinematic: {
    model: "Sony FX6",
    lens: "35mm f/1.4",
    style: "cinematic depth, anamorphic feel"
  },
  landscape: {
    model: "Fujifilm GFX 100S",
    lens: "32-64mm f/4",
    style: "medium format clarity, rich tonality"
  },
  street: {
    model: "Leica M11",
    lens: "35mm f/1.4 Summilux",
    style: "documentary feel, natural grain"
  },
  fashion: {
    model: "Hasselblad X2D",
    lens: "90mm f/2.5",
    style: "medium format, editorial quality"
  }
};
```

#### STEP 4: Shot Type & Composition
```
15가지 카메라 앵글 DB:

1.  eye_level        → "eye level shot" (기본, 자연스러운)
2.  low_angle        → "low angle shot, from below" (위압감, 파워)
3.  high_angle       → "high angle shot, from above" (조감, 취약함)
4.  birds_eye        → "bird's eye view, directly from above" (전체 조망)
5.  dutch_angle      → "dutch angle, tilted frame" (긴장감, 불안)
6.  over_shoulder     → "over the shoulder shot" (대화 장면)
7.  close_up         → "close-up shot, filling frame" (디테일, 감정)
8.  extreme_close_up → "extreme close-up" (극한 디테일)
9.  medium_shot      → "medium shot, waist up" (인물 + 환경)
10. full_body        → "full body shot" (전신)
11. wide_shot        → "wide establishing shot" (전체 장면)
12. pov              → "first person POV shot" (주관 시점)
13. tracking         → "tracking shot, following subject" (VIDEO 전용)
14. crane            → "crane shot, descending/ascending" (VIDEO 전용)
15. orbital          → "orbital shot, circling subject" (VIDEO 전용)

자동 매칭:
- 인물 상담 장면 → medium_shot 또는 over_shoulder
- 건물 외관 → wide_shot 또는 low_angle
- 인테리어 → eye_level (wide)
- 제품 → close_up
- 숏폼 인물 → medium_shot + low_angle
- 드론 → birds_eye
```

#### STEP 5: Lighting & Atmosphere
```
20가지+ 조명 타입 DB:

자연광 계열:
1.  golden_hour       → "golden hour warm sunlight, long shadows"
2.  blue_hour         → "blue hour ambient light, cool tones"
3.  overcast          → "soft overcast diffused light, even illumination"
4.  harsh_midday      → "harsh midday sun, strong shadows"
5.  window_light      → "natural window light, soft directional"
6.  backlight         → "backlit silhouette edge light, sun behind subject"
7.  dappled           → "dappled light through leaves, organic shadows"

스튜디오 계열:
8.  softbox           → "softbox studio lighting, even skin tones"
9.  rembrandt         → "Rembrandt lighting, triangle cheek shadow"
10. split             → "split lighting, half face shadow"
11. butterfly         → "butterfly lighting, shadow under nose"
12. rim_light         → "rim light, edge highlighting, dark background"
13. broad             → "broad lighting, face toward light"
14. loop              → "loop lighting, small nose shadow"

시네마틱 계열:
15. cinematic_warm    → "warm cinematic lighting, amber tones"
16. cinematic_cool    → "cool cinematic lighting, teal shadows"
17. neon              → "neon lighting, cyberpunk glow, pink and blue"
18. dramatic          → "dramatic chiaroscuro, deep shadows"
19. volumetric        → "volumetric light rays, atmospheric haze"
20. practical         → "practical lighting from lamps and screens"

부동산 특화:
21. real_estate_interior → "bright airy interior lighting, all lights on, HDR feel"
22. real_estate_exterior → "clear sky natural light, vibrant green landscape"
23. real_estate_twilight → "twilight exterior, warm interior glow through windows"

자동 매칭:
- Tone: Professional → softbox 또는 window_light
- Tone: Luxury → golden_hour 또는 rim_light
- Tone: Friendly → overcast 또는 golden_hour
- Tone: Modern → cinematic_cool 또는 softbox
- Tone: Cinematic → dramatic 또는 volumetric
- ContentType: SHORTFORM → neon, dramatic, rim_light 우선
- Usage: Real Estate Interior → real_estate_interior
- Usage: Real Estate Exterior → real_estate_twilight (가장 효과적)
```

#### STEP 6: Color Grading & Mood
```
컬러 그레이딩 DB:

1.  warm_earth      → "warm earth tones, amber and brown palette"
2.  cool_teal       → "cool teal and orange color grading"
3.  muted_film      → "muted desaturated film colors, analog feel"
4.  vibrant_pop     → "vibrant saturated colors, punchy contrast"
5.  monochrome      → "black and white, high contrast monochrome"
6.  pastel_soft     → "soft pastel color palette, low contrast"
7.  cinematic_lut   → "cinematic color grading, crushed blacks, lifted shadows"
8.  golden_warm     → "warm golden color cast, sunset palette"
9.  nordic_minimal  → "nordic minimal palette, whites and grays, clean"
10. luxury_dark     → "dark luxury palette, deep blacks, gold accents"
11. film_noir       → "film noir high contrast, dramatic shadows"
12. kodak_portra    → "Kodak Portra 400 film colors, warm skin tones"
13. fuji_velvia     → "Fuji Velvia saturated colors, vivid landscape"

콘텐츠 타입별 기본값:
- IMAGE (랜딩페이지) → cinematic_lut 또는 warm_earth
- IMAGE (블로그) → muted_film 또는 pastel_soft
- VIDEO → cinematic_lut
- SHORTFORM → vibrant_pop 또는 cool_teal (스크롤 멈춤 효과)
- Real Estate → golden_warm 또는 nordic_minimal
```

#### STEP 7: Motion & Dynamic (VIDEO / SHORTFORM 전용)
```
IMAGE 타입에서는 이 단계를 완전히 스킵함.

VIDEO 모션 DB:
1.  tracking_forward   → "smooth tracking shot moving forward"
2.  tracking_lateral   → "lateral tracking shot, camera gliding sideways"
3.  crane_up           → "ascending crane shot, rising reveal"
4.  crane_down         → "descending crane shot, lowering into scene"
5.  dolly_zoom         → "dolly zoom, vertigo effect"
6.  orbital            → "orbital camera movement, circling subject"
7.  fpv_drone          → "FPV drone flight, dynamic movement through space"
8.  steady_walk        → "steadicam walking shot, smooth follow"
9.  push_in            → "slow push in, building tension"
10. pull_out           → "slow pull out, revealing context"
11. static_subtle      → "mostly static with subtle atmospheric movement"

SHORTFORM 모션 DB:
1.  wind_hair          → "slight wind blowing hair"
2.  fabric_flow        → "fabric gently flowing"
3.  dynamic_pose       → "dynamic natural pose, mid-motion"
4.  particle_float     → "floating particles in air"
5.  water_ripple       → "subtle water ripple reflection"
6.  light_flicker      → "gentle light flickering"
7.  smoke_wisp         → "thin smoke wisps drifting"
8.  bokeh_shift        → "bokeh lights gently shifting"

자동 매칭:
- 부동산 투어 → tracking_forward + crane_up
- 인물 광고 → orbital 또는 steady_walk
- 숏폼 인물 → wind_hair + dynamic_pose
- 숏폼 제품 → orbital + particle_float
- 건물 외관 → fpv_drone 또는 crane_up
```

#### STEP 8: Parameters
```
V7 파라미터 자동 세팅:

필수 파라미터:
- --ar (Aspect Ratio): 콘텐츠/용도에 따라 자동
- --s (Stylize): 0~1000, 기본 250
- --v 7 (버전)

선택 파라미터:
- --chaos: 0~100, 기본 0 (변형 정도)
- --no: 네거티브 프롬프트 (제외할 요소)
- --seed: 재현용 시드값
- --q 2: 고품질 모드

V7 전용 파라미터:
- --oref [URL]: Omni Reference (객체/인물 일관성)
- --ow: Omni Weight 0~1000 (기본 100)
- --sref [URL]: Style Reference (스타일 일관성)
- --sw: Style Weight 0~1000
- --cref [URL]: Character Reference (캐릭터 일관성)
- --cw: Character Weight
- --mode draft: 빠른 미리보기 (10배 빠름, GPU 절반)
- --lens: 렌즈 지정 (V7 네이티브)
- --lut: LUT 컬러 프로파일

Aspect Ratio 자동 매칭:
┌────────────────────┬──────────┐
│ Usage              │ --ar     │
├────────────────────┼──────────┤
│ 랜딩페이지 히어로   │ 16:9     │
│ 유튜브 썸네일       │ 16:9     │
│ 유튜브 영상         │ 16:9     │
│ 숏폼 (릴스/쇼츠)   │ 9:16     │
│ 인스타 피드         │ 1:1      │
│ 인스타 세로         │ 4:5      │
│ 블로그 헤더         │ 16:9     │
│ 블로그 본문         │ 3:2      │
│ 부동산 매물사진     │ 3:2      │
│ 네이버 블로그       │ 16:9     │
│ 카카오 배너         │ 2:1      │
│ 명함/전단지         │ 3:2      │
└────────────────────┴──────────┘

Stylize 자동 매칭:
- IMAGE (실사 중심) → --s 100~200 (낮을수록 사실적)
- IMAGE (크리에이티브) → --s 300~500
- VIDEO → --s 200~350
- SHORTFORM → --s 300~500 (시선 집중)
- 부동산 → --s 100~150 (사실적 우선)

⚠️ 중요: V6+에서 절대 사용하지 않는 키워드:
- "photorealistic" (이미 기본값, 쓰면 오히려 이상해짐)
- "8k", "4k", "UHD" (junk 키워드, 효과 없음)
- "ultra detailed" (V7이 알아서 처리)
- "award winning" (의미 없음)
- "masterpiece" (의미 없음)
- "best quality" (의미 없음)
```

---

## 4. 프롬프트 학습 & 기억 시스템 (Deep Learning Engine)

### 4-1. 개요

이 시스템은 ML 모델이 아닌 **규칙 기반 학습 + 사용자 피드백 루프**로 작동:

```
사용자 생성 → 평가(⭐) → 패턴 분석 → 규칙 자동 조정 → 다음 생성에 반영
```

### 4-2. Custom Keyword Database

```typescript
// 사용자가 직접 추가/수정/삭제 가능한 키워드 DB
interface CustomKeyword {
  id: string;
  category: 'camera' | 'lens' | 'lighting' | 'color' | 'motion' | 'style' | 'scene' | 'custom';
  keyword: string;           // 영어 키워드
  korean_label: string;      // 한국어 라벨
  description?: string;      // 설명
  weight: number;            // 1~10 (프롬프트 내 우선순위)
  content_types: ContentType[]; // 적용 가능한 콘텐츠 타입
  usage_count: number;       // 사용 횟수 (자동 증가)
  success_rate: number;      // 성공률 (사용자 평가 기반)
  created_at: string;
  updated_at: string;
}

// LocalStorage 키: 'mjpg_custom_keywords'
```

### 4-3. Prompt Memory System

```typescript
// 생성된 프롬프트 히스토리 + 평가 저장
interface PromptHistory {
  id: string;
  input: {
    subject: string;         // 한국어 원문
    content_type: ContentType;
    usage_type: string;
    character_type: string;
    tone: string;
    aspect_ratio: string;
    // Pro Mode 추가 옵션
    camera?: string;
    lens?: string;
    lighting?: string;
    color_grading?: string;
    motion?: string;
  };
  output: {
    full_prompt: string;     // 최종 프롬프트
    segments: {              // 각 단계별 분리
      subject: string;
      character: string;
      camera: string;
      shot: string;
      lighting: string;
      color: string;
      motion: string;
      parameters: string;
    };
  };
  rating: number;            // 0~5 (사용자 평가)
  is_favorite: boolean;
  tags: string[];            // 사용자 태그
  notes: string;             // 사용자 메모 (ex: "미드저니에서 시드 1234로 좋은 결과")
  created_at: string;
}

// LocalStorage 키: 'mjpg_history'
```

### 4-4. Preset System (프리셋)

```typescript
// 자주 쓰는 설정 조합을 프리셋으로 저장
interface Preset {
  id: string;
  name: string;              // ex: "온시아 분양 홍보용"
  description: string;
  content_type: ContentType;
  settings: {
    usage_type: string;
    character_type: string;
    tone: string;
    aspect_ratio: string;
    camera: string;
    lens: string;
    lighting: string;
    color_grading: string;
    motion?: string;
    stylize: number;
    chaos: number;
    negative_prompt: string;
    extra_keywords: string[];
  };
  usage_count: number;
  is_default: boolean;
  created_at: string;
}

// 기본 제공 프리셋 (5개):
const DEFAULT_PRESETS: Preset[] = [
  {
    name: "부동산 분양 홍보",
    content_type: "IMAGE",
    settings: {
      usage_type: "real_estate_marketing",
      tone: "professional",
      camera: "architecture_interior",
      lighting: "real_estate_interior",
      color_grading: "golden_warm",
      stylize: 120,
      negative_prompt: "blurry, distorted, cartoon, illustration"
    }
  },
  {
    name: "유튜브 썸네일",
    content_type: "IMAGE",
    settings: {
      usage_type: "youtube_thumbnail",
      tone: "cinematic",
      camera: "portrait",
      lighting: "dramatic",
      color_grading: "cinematic_lut",
      stylize: 350,
      negative_prompt: "text, watermark, logo"
    }
  },
  {
    name: "인스타 릴스/숏폼",
    content_type: "SHORTFORM",
    settings: {
      usage_type: "shortform",
      tone: "modern",
      camera: "cinematic",
      lighting: "rim_light",
      color_grading: "vibrant_pop",
      motion: "dynamic_pose",
      stylize: 400,
      negative_prompt: "static, boring, flat"
    }
  },
  {
    name: "부동산 영상 투어",
    content_type: "VIDEO",
    settings: {
      usage_type: "real_estate_video",
      tone: "luxury",
      camera: "architecture_interior",
      lighting: "real_estate_interior",
      color_grading: "warm_earth",
      motion: "tracking_forward",
      stylize: 150
    }
  },
  {
    name: "랜딩페이지 히어로",
    content_type: "IMAGE",
    settings: {
      usage_type: "landing_page",
      tone: "modern",
      camera: "environmental_portrait",
      lighting: "cinematic_warm",
      color_grading: "cinematic_lut",
      stylize: 250,
      negative_prompt: "cluttered, busy background"
    }
  }
];
```

### 4-5. Smart Learning Rules (학습 규칙)

```typescript
// 사용자 평가 데이터를 분석하여 자동 규칙 조정
interface LearningEngine {
  // 1. 높은 평가(4~5점) 프롬프트의 공통 패턴 추출
  analyzeSuccessPatterns(): Pattern[];
  
  // 2. 낮은 평가(1~2점) 프롬프트의 실패 패턴 추출
  analyzeFailurePatterns(): Pattern[];
  
  // 3. 콘텐츠 타입별 최적 stylize 값 자동 계산
  getOptimalStylize(contentType: ContentType): number;
  
  // 4. 가장 많이 사용된 키워드 조합 추천
  getTopCombinations(contentType: ContentType, limit: number): Combination[];
  
  // 5. 사용하지 않는 키워드 자동 비활성화 제안
  getSuggestedDeprecations(): CustomKeyword[];
}

// 학습 데이터 저장
// LocalStorage 키: 'mjpg_learning_data'
interface LearningData {
  total_generated: number;
  avg_rating: number;
  top_cameras: Record<string, number>;      // camera_id → avg_rating
  top_lighting: Record<string, number>;
  top_color_grading: Record<string, number>;
  keyword_effectiveness: Record<string, {
    usage_count: number;
    avg_rating: number;
    last_used: string;
  }>;
  content_type_stats: Record<ContentType, {
    count: number;
    avg_rating: number;
    best_stylize: number;
    best_chaos: number;
  }>;
}
```

---

## 5. UI 구성

### 5-1. 레이아웃

```
┌──────────────────────────────────────────────────┐
│  HEADER: Midjourney Pro Prompt Generator          │
│  [IMAGE] [VIDEO] [SHORTFORM] ← 탭 전환           │
├────────────────────────┬─────────────────────────┤
│                        │                         │
│   INPUT PANEL (Left)   │   RESULT PANEL (Right)  │
│                        │                         │
│  ┌──────────────────┐  │  ┌───────────────────┐  │
│  │ Subject 입력     │  │  │ 생성된 프롬프트    │  │
│  │ (한국어 텍스트)   │  │  │ (하이라이트 표시)  │  │
│  └──────────────────┘  │  │                   │  │
│                        │  │ [Copy] [Re-gen]   │  │
│  ┌──────────────────┐  │  │ [Save] [Favorite] │  │
│  │ Basic Options    │  │  └───────────────────┘  │
│  │ - Usage Type     │  │                         │
│  │ - Character Type │  │  ┌───────────────────┐  │
│  │ - Tone           │  │  │ 프롬프트 분석      │  │
│  │ - Aspect Ratio   │  │  │ (각 단계별 분리)   │  │
│  └──────────────────┘  │  └───────────────────┘  │
│                        │                         │
│  ▼ Pro Options (토글)  │  ┌───────────────────┐  │
│  ┌──────────────────┐  │  │ Quick Presets     │  │
│  │ Camera Model     │  │  │ ● 분양홍보        │  │
│  │ Lens             │  │  │ ● 유튜브썸네일    │  │
│  │ Lighting         │  │  │ ● 숏폼            │  │
│  │ Color Grading    │  │  │ ● 영상투어        │  │
│  │ Motion (V/S)     │  │  │ ● 랜딩페이지      │  │
│  │ --s 슬라이더     │  │  │ [+ 새 프리셋]     │  │
│  │ --chaos 슬라이더 │  │  └───────────────────┘  │
│  │ --no 입력        │  │                         │
│  │ V7 Refs (URLs)   │  │                         │
│  └──────────────────┘  │                         │
│                        │                         │
│  [🚀 Generate Prompt]  │                         │
│  [🔄 Reset]            │                         │
│                        │                         │
├────────────────────────┴─────────────────────────┤
│  BOTTOM PANEL: History & Favorites (접이식)       │
│  최근 생성 | 즐겨찾기 | 키워드 관리 | 통계        │
└──────────────────────────────────────────────────┘
```

### 5-2. Usage Type 옵션 (콘텐츠 타입별 분기)

```typescript
const USAGE_TYPES = {
  IMAGE: [
    { id: 'landing_page',        label: '랜딩페이지 히어로' },
    { id: 'youtube_thumbnail',   label: '유튜브 썸네일' },
    { id: 'blog_header',         label: '블로그 헤더' },
    { id: 'blog_content',        label: '블로그 본문 이미지' },
    { id: 'instagram_feed',      label: '인스타그램 피드' },
    { id: 'instagram_story',     label: '인스타그램 스토리' },
    { id: 'naver_blog',          label: '네이버 블로그' },
    { id: 'banner_ad',           label: '배너 광고' },
    { id: 'real_estate_listing', label: '부동산 매물 사진' },
    { id: 'real_estate_marketing',label: '부동산 분양 홍보' },
    { id: 'business_card',       label: '명함/전단지용' },
    { id: 'kakao_banner',        label: '카카오 배너' },
  ],
  VIDEO: [
    { id: 'youtube_intro',       label: '유튜브 인트로' },
    { id: 'real_estate_tour',    label: '부동산 투어 영상' },
    { id: 'brand_video',         label: '브랜드 영상' },
    { id: 'product_reveal',      label: '제품 소개 영상' },
    { id: 'cinematic_ad',        label: '시네마틱 광고' },
  ],
  SHORTFORM: [
    { id: 'reels',               label: '인스타 릴스' },
    { id: 'youtube_shorts',      label: '유튜브 쇼츠' },
    { id: 'tiktok',              label: '틱톡' },
    { id: 'shortform_ad',        label: '숏폼 광고' },
  ]
};
```

### 5-3. Character Type 옵션

```typescript
const CHARACTER_TYPES = [
  { id: 'korean_male',          label: '한국인 남성' },
  { id: 'korean_female',        label: '한국인 여성' },
  { id: 'korean_couple',        label: '한국인 커플' },
  { id: 'korean_family',        label: '한국인 가족' },
  { id: 'office_worker_male',   label: '남성 직장인' },
  { id: 'office_worker_female', label: '여성 직장인' },
  { id: 'real_estate_agent_m',  label: '남성 공인중개사' },
  { id: 'real_estate_agent_f',  label: '여성 공인중개사' },
  { id: 'young_professional',   label: '2030 청년' },
  { id: 'senior',               label: '시니어' },
  { id: 'no_person',            label: '인물 없음 (건축/인테리어만)' },
];
```

### 5-4. Tone 옵션

```typescript
const TONES = [
  { id: 'professional', label: '프로페셔널',  desc: '깔끔하고 신뢰감 있는' },
  { id: 'luxury',       label: '럭셔리',      desc: '고급스럽고 세련된' },
  { id: 'friendly',     label: '친근한',      desc: '따뜻하고 접근하기 쉬운' },
  { id: 'modern',       label: '모던',        desc: '현대적이고 깨끗한' },
  { id: 'cinematic',    label: '시네마틱',    desc: '영화 같은 분위기' },
  { id: 'warm',         label: '따뜻한',      desc: '감성적이고 포근한' },
  { id: 'energetic',    label: '에너지틱',    desc: '활기차고 역동적인' },
  { id: 'minimal',      label: '미니멀',      desc: '절제되고 심플한' },
  { id: 'dramatic',     label: '드라마틱',    desc: '강렬하고 임팩트 있는' },
  { id: 'editorial',    label: '에디토리얼',  desc: '매거진 스타일' },
];
```

---

## 6. 프로젝트 디렉토리 구조

```
midjourney-prompt-generator/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
│
├── public/
│   └── fonts/
│       └── PretendardVariable.woff2
│
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 메타, 다크모드)
│   ├── page.tsx                # 메인 페이지
│   ├── globals.css             # Tailwind + 커스텀 스타일
│   └── keywords/
│       └── page.tsx            # 키워드 관리 페이지
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 앱 헤더 + 콘텐츠 타입 탭
│   │   └── Footer.tsx
│   │
│   ├── prompt/
│   │   ├── ContentTypeTab.tsx  # IMAGE / VIDEO / SHORTFORM 탭
│   │   ├── SubjectInput.tsx    # 한국어 주제 입력
│   │   ├── BasicOptions.tsx    # 기본 옵션 (Usage, Character, Tone, AR)
│   │   ├── ProOptions.tsx      # 프로 옵션 (카메라, 렌즈, 조명 등)
│   │   ├── ParameterPanel.tsx  # V7 파라미터 슬라이더
│   │   ├── V7RefPanel.tsx      # --sref, --cref, --oref URL 입력
│   │   └── GenerateButton.tsx
│   │
│   ├── result/
│   │   ├── ResultBox.tsx       # 결과 프롬프트 표시 (하이라이트)
│   │   ├── PromptSegments.tsx  # 단계별 분리 표시
│   │   ├── ActionButtons.tsx   # 복사, 재생성, 저장, 즐겨찾기
│   │   └── RatingStars.tsx     # 별점 평가
│   │
│   ├── preset/
│   │   ├── PresetList.tsx      # 프리셋 목록
│   │   ├── PresetCard.tsx      # 프리셋 카드
│   │   └── PresetEditor.tsx    # 프리셋 생성/수정 모달
│   │
│   ├── history/
│   │   ├── HistoryPanel.tsx    # 히스토리 패널 (하단)
│   │   ├── HistoryItem.tsx     # 히스토리 아이템
│   │   ├── FavoriteList.tsx    # 즐겨찾기 목록
│   │   └── StatsView.tsx       # 통계 뷰
│   │
│   ├── keywords/
│   │   ├── KeywordManager.tsx  # 키워드 관리 UI
│   │   ├── KeywordEditor.tsx   # 키워드 추가/수정
│   │   └── KeywordImport.tsx   # JSON 가져오기/내보내기
│   │
│   └── ui/
│       ├── Slider.tsx          # 커스텀 슬라이더
│       ├── Select.tsx          # 커스텀 셀렉트
│       ├── Toggle.tsx          # 토글 스위치
│       ├── Modal.tsx           # 모달
│       ├── Toast.tsx           # 토스트 알림
│       └── Tooltip.tsx         # 툴팁
│
├── lib/
│   ├── engine/
│   │   ├── promptEngine.ts     # 핵심 프롬프트 생성 엔진
│   │   ├── subjectParser.ts    # 한국어 → 영어 주제 변환
│   │   ├── autoMatcher.ts      # 자동 매칭 로직 (카메라, 조명 등)
│   │   └── parameterBuilder.ts # 파라미터 조합 빌더
│   │
│   ├── database/
│   │   ├── cameras.ts          # 카메라 모델 DB
│   │   ├── lenses.ts           # 렌즈 스펙 DB
│   │   ├── angles.ts           # 카메라 앵글 DB
│   │   ├── lighting.ts         # 조명 타입 DB
│   │   ├── colorGrading.ts     # 컬러 그레이딩 DB
│   │   ├── motions.ts          # 모션/다이나믹 DB
│   │   ├── characters.ts       # 캐릭터 스타일링 DB
│   │   └── negativePrompts.ts  # 네거티브 프롬프트 DB
│   │
│   ├── presets/
│   │   ├── defaultPresets.ts   # 기본 프리셋 5종
│   │   └── presetManager.ts    # 프리셋 CRUD
│   │
│   ├── storage/
│   │   ├── localStorage.ts     # LocalStorage 유틸
│   │   ├── historyStore.ts     # 히스토리 저장/조회
│   │   ├── keywordStore.ts     # 커스텀 키워드 저장
│   │   └── learningStore.ts    # 학습 데이터 저장
│   │
│   ├── learning/
│   │   ├── learningEngine.ts   # 학습 엔진
│   │   ├── patternAnalyzer.ts  # 패턴 분석
│   │   └── recommendations.ts  # 추천 시스템
│   │
│   └── utils/
│       ├── clipboard.ts        # 클립보드 복사
│       ├── exportImport.ts     # JSON 내보내기/가져오기
│       └── constants.ts        # 상수 정의
│
├── types/
│   ├── prompt.ts               # 프롬프트 관련 타입
│   ├── database.ts             # DB 관련 타입
│   ├── preset.ts               # 프리셋 타입
│   └── learning.ts             # 학습 관련 타입
│
└── hooks/
    ├── usePromptEngine.ts      # 프롬프트 생성 훅
    ├── useHistory.ts           # 히스토리 훅
    ├── usePresets.ts           # 프리셋 훅
    ├── useKeywords.ts          # 키워드 관리 훅
    └── useLearning.ts          # 학습 데이터 훅
```

---

## 7. 예시 동작

### 예시 1: IMAGE — 부동산 분양 홍보

```
입력:
  Subject: "한강뷰 대형 거실 인테리어"
  Content Type: IMAGE
  Usage: 부동산 분양 홍보
  Character: 인물 없음
  Tone: 럭셔리
  Mode: Basic

출력:
Spacious luxury living room interior with floor-to-ceiling panoramic
windows overlooking Han River skyline at golden hour, high ceilings
with contemporary designer furniture and warm wood accents, shot with
Sony A7 III 16-35mm f/2.8 wide-angle interior perspective, eye level
composition showing full depth of space, bright airy natural window
light with warm golden hour glow streaming across surfaces, warm earth
tones with amber and cream palette, architectural interior photography
--ar 16:9 --s 120 --v 7 --no people clutter personal items
```

### 예시 2: SHORTFORM — 인스타 릴스

```
입력:
  Subject: "모델하우스에서 감탄하는 신혼부부"
  Content Type: SHORTFORM
  Usage: 인스타 릴스
  Character: 한국인 커플
  Tone: 따뜻한
  Mode: Basic

출력:
Young Korean newlywed couple walking through a bright luxury model
house with amazed expressions, casual smart outfits in earth tones,
warm genuine smiles looking around spacious rooms, shot with Sony FX6
35mm f/1.4 cinematic depth, medium shot following couple from behind
then revealing their faces, warm golden hour natural light through
large windows with gentle lens flare, soft warm color grading with
amber tones, slight wind through hair, natural walking movement,
fabric gently flowing, dynamic candid moment
--ar 9:16 --s 380 --v 7 --no static boring flat
```

### 예시 3: VIDEO — 부동산 투어

```
입력:
  Subject: "고급 주상복합 로비에서 엘리베이터까지"
  Content Type: VIDEO
  Usage: 부동산 투어 영상
  Character: 인물 없음
  Tone: 럭셔리
  Mode: Basic

출력:
Luxury mixed-use residential tower grand lobby interior with marble
floors and contemporary art installations, crystal chandelier overhead,
leading to premium elevator hall with gold accents, shot with Sony A7 III
16-35mm f/2.8 wide-angle interior, smooth tracking shot moving forward
through lobby revealing elevator hall with ascending crane movement,
bright airy interior lighting with warm accent lights and natural
window light, luxury dark palette with deep marble tones and gold
highlights, smooth forward dolly movement through space with subtle
ascending reveal
--ar 16:9 --s 150 --v 7
```

### 예시 4: IMAGE — Pro Mode 사용

```
입력:
  Subject: "오피스에서 계약서 서명하는 공인중개사"
  Content Type: IMAGE
  Usage: 블로그 본문 이미지
  Character: 여성 공인중개사
  Tone: 프로페셔널
  Mode: Pro
    Camera: Canon EOS 5D Mark IV (직접 선택)
    Lens: 50mm f/2.0 (직접 선택)
    Lighting: window_light (직접 선택)
    Color: muted_film (직접 선택)
    --s: 180 (슬라이더 조정)
    --no: "messy desk, dark shadows"

출력:
Professional Korean female real estate agent signing contract documents
at a clean modern desk, neat charcoal blazer with white blouse,
confident focused expression, slight natural smile, shot with Canon EOS
5D Mark IV 50mm f/2.0 natural depth, over the shoulder composition
showing hands and document with agent's face in soft focus, natural
window light streaming from left creating soft directional shadows on
desk surface, muted desaturated film colors with analog warmth
--ar 3:2 --s 180 --v 7 --no messy desk dark shadows
```

---

## 8. 디자인 시스템

### 컬러 팔레트

```css
:root {
  /* 다크 테마 기본 */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a25;
  --bg-hover: #22222f;
  
  --text-primary: #e8e8ed;
  --text-secondary: #8888a0;
  --text-muted: #55556a;
  
  --accent-primary: #6366f1;    /* 인디고 — 메인 액센트 */
  --accent-secondary: #8b5cf6;  /* 바이올렛 */
  --accent-success: #22c55e;    /* 성공/복사 완료 */
  --accent-warning: #f59e0b;    /* 주의 */
  
  /* 콘텐츠 타입별 컬러 */
  --color-image: #3b82f6;       /* 블루 */
  --color-video: #ef4444;       /* 레드 */
  --color-shortform: #f97316;   /* 오렌지 */
  
  --border: #2a2a3a;
  --border-active: #4a4a6a;
}
```

### 타이포그래피

```
한글: Pretendard Variable (400, 500, 600, 700)
영문/코드/프롬프트: JetBrains Mono (400, 500, 600)
제목: Pretendard 700
본문: Pretendard 400
프롬프트 출력: JetBrains Mono 500
```

---

## 9. 설치 및 실행 방법 (Windows 터미널)

```bash
# 1. 프로젝트 생성
npx create-next-app@latest midjourney-prompt-generator \
  --typescript --tailwind --eslint --app --src-dir=false \
  --import-alias="@/*" --use-npm

# 2. 프로젝트 폴더 이동
cd midjourney-prompt-generator

# 3. 추가 패키지 설치
npm install lucide-react framer-motion
npm install -D @types/node

# 4. 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

---

## 10. 향후 확장 가능 기능

### Phase 2 (추후)
- [ ] Claude API 연동: 한국어 → 영어 번역 고도화 (현재는 규칙 기반 매핑)
- [ ] Midjourney API 연동: 프롬프트 직접 전송 (API 공개 시)
- [ ] 이미지 레퍼런스 업로드: --sref, --cref URL 자동 관리
- [ ] 팀 공유: 프리셋/키워드 DB를 JSON으로 팀원과 공유
- [ ] 다국어 지원: 영어/일본어 입력 지원
- [ ] PWA: 모바일에서도 사용 가능하게

### Phase 3 (장기)
- [ ] Supabase 연동: 클라우드 저장 + 멀티 디바이스 동기화
- [ ] 프롬프트 마켓플레이스: 프리셋을 다른 사용자와 공유/판매
- [ ] A/B 테스트: 같은 주제로 다른 설정 비교 생성
- [ ] Stable Diffusion / DALL-E 3 프롬프트 동시 생성

---

## 11. 개발 시 주의사항

```
✅ DO:
- 모든 DB 데이터는 /lib/database/ 내 TypeScript 파일로 분리
- 프롬프트 엔진 로직은 UI와 완전 분리 (/lib/engine/)
- LocalStorage 키는 'mjpg_' 접두사 통일
- 모든 컴포넌트에 한국어 주석 포함
- 콘텐츠 타입(IMAGE/VIDEO/SHORTFORM)에 따라 UI 동적 변경
- 다크 테마 기본 (밝은 테마 불필요)
- 프롬프트 결과에서 각 단계를 색상으로 하이라이트 구분

❌ DON'T:
- 절대 "photorealistic, 8k, ultra detailed" 같은 junk 키워드 포함 금지
- --style raw를 기본값으로 고정하지 말 것 (사용자 선택)
- 서버 사이드 API 호출 없음 (100% 클라이언트 사이드)
- 외부 API 의존 없음 (오프라인 동작 가능해야 함)
- 하드코딩된 프롬프트 템플릿 사용 금지 (항상 엔진 조합으로 생성)
```

---

## 12. 핵심 프롬프트 생성 엔진 수도코드

```typescript
function generatePrompt(input: PromptInput): PromptOutput {
  const { subject, contentType, usageType, characterType, tone, aspectRatio, proOptions } = input;
  
  // Step 1: Subject 변환
  const subjectEn = parseSubject(subject, characterType);
  
  // Step 2: Character 스타일링 (no_person이면 스킵)
  const characterEn = characterType !== 'no_person' 
    ? getCharacterStyling(characterType, tone) 
    : '';
  
  // Step 3: Camera & Lens (Pro에서 직접 선택 또는 Auto)
  const camera = proOptions?.camera 
    ? CAMERA_DB[proOptions.camera] 
    : autoMatchCamera(subject, characterType, usageType);
  
  // Step 4: Shot & Composition
  const shot = proOptions?.shot 
    ? SHOT_DB[proOptions.shot] 
    : autoMatchShot(characterType, usageType, contentType);
  
  // Step 5: Lighting
  const lighting = proOptions?.lighting 
    ? LIGHTING_DB[proOptions.lighting] 
    : autoMatchLighting(tone, usageType, contentType);
  
  // Step 6: Color Grading
  const color = proOptions?.colorGrading 
    ? COLOR_DB[proOptions.colorGrading] 
    : autoMatchColor(tone, contentType, usageType);
  
  // Step 7: Motion (VIDEO/SHORTFORM만)
  const motion = contentType !== 'IMAGE' 
    ? (proOptions?.motion 
        ? MOTION_DB[proOptions.motion] 
        : autoMatchMotion(contentType, usageType, subject))
    : '';
  
  // Step 8: Parameters
  const params = buildParameters({
    ar: aspectRatio || autoMatchAR(usageType),
    stylize: proOptions?.stylize || autoMatchStylize(contentType, usageType),
    chaos: proOptions?.chaos || 0,
    version: 7,
    negative: proOptions?.negative || autoMatchNegative(usageType),
    sref: proOptions?.sref,
    cref: proOptions?.cref,
    oref: proOptions?.oref,
  });
  
  // 조합
  const segments = { subjectEn, characterEn, camera, shot, lighting, color, motion, params };
  const fullPrompt = combineSegments(segments, contentType);
  
  return { fullPrompt, segments };
}
```

---

> **이 명세서를 기반으로 전체 Next.js 프로젝트 코드를 작성해 주세요.**
> 
> 터미널에서 `npx create-next-app` → 코드 작성 → `npm run dev`로
> 즉시 실행 가능한 완성형 프로젝트를 만들어 주세요.
