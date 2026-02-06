// 상수 정의

import type { ContentType } from '@/types/prompt';
import type { UsageOption, ToneOption, CharacterOption } from '@/types/database';

export const USAGE_TYPES: Record<ContentType, UsageOption[]> = {
  IMAGE: [
    { id: 'landing_page', label: '랜딩페이지 히어로' },
    { id: 'youtube_thumbnail', label: '유튜브 썸네일' },
    { id: 'blog_header', label: '블로그 헤더' },
    { id: 'blog_content', label: '블로그 본문 이미지' },
    { id: 'instagram_feed', label: '인스타그램 피드' },
    { id: 'instagram_story', label: '인스타그램 스토리' },
    { id: 'naver_blog', label: '네이버 블로그' },
    { id: 'banner_ad', label: '배너 광고' },
    { id: 'real_estate_listing', label: '부동산 매물 사진' },
    { id: 'real_estate_marketing', label: '부동산 분양 홍보' },
    { id: 'business_card', label: '명함/전단지용' },
    { id: 'kakao_banner', label: '카카오 배너' },
  ],
  VIDEO: [
    { id: 'youtube_intro', label: '유튜브 인트로' },
    { id: 'real_estate_tour', label: '부동산 투어 영상' },
    { id: 'brand_video', label: '브랜드 영상' },
    { id: 'product_reveal', label: '제품 소개 영상' },
    { id: 'cinematic_ad', label: '시네마틱 광고' },
  ],
  SHORTFORM: [
    { id: 'reels', label: '인스타 릴스' },
    { id: 'youtube_shorts', label: '유튜브 쇼츠' },
    { id: 'tiktok', label: '틱톡' },
    { id: 'shortform_ad', label: '숏폼 광고' },
  ],
};

export const CHARACTER_TYPES: CharacterOption[] = [
  { id: 'korean_male', label: '한국인 남성' },
  { id: 'korean_female', label: '한국인 여성' },
  { id: 'korean_couple', label: '한국인 커플' },
  { id: 'korean_family', label: '한국인 가족' },
  { id: 'office_worker_male', label: '남성 직장인' },
  { id: 'office_worker_female', label: '여성 직장인' },
  { id: 'real_estate_agent_m', label: '남성 공인중개사' },
  { id: 'real_estate_agent_f', label: '여성 공인중개사' },
  { id: 'young_professional', label: '2030 청년' },
  { id: 'senior', label: '시니어' },
  { id: 'no_person', label: '인물 없음 (건축/인테리어만)' },
];

export const TONES: ToneOption[] = [
  { id: 'professional', label: '프로페셔널', desc: '깔끔하고 신뢰감 있는' },
  { id: 'luxury', label: '럭셔리', desc: '고급스럽고 세련된' },
  { id: 'friendly', label: '친근한', desc: '따뜻하고 접근하기 쉬운' },
  { id: 'modern', label: '모던', desc: '현대적이고 깨끗한' },
  { id: 'cinematic', label: '시네마틱', desc: '영화 같은 분위기' },
  { id: 'warm', label: '따뜻한', desc: '감성적이고 포근한' },
  { id: 'energetic', label: '에너지틱', desc: '활기차고 역동적인' },
  { id: 'minimal', label: '미니멀', desc: '절제되고 심플한' },
  { id: 'dramatic', label: '드라마틱', desc: '강렬하고 임팩트 있는' },
  { id: 'editorial', label: '에디토리얼', desc: '매거진 스타일' },
];

export const AR_MAP: Record<string, string> = {
  landing_page: '16:9',
  youtube_thumbnail: '16:9',
  blog_header: '16:9',
  blog_content: '3:2',
  instagram_feed: '1:1',
  instagram_story: '9:16',
  naver_blog: '16:9',
  banner_ad: '16:9',
  real_estate_listing: '3:2',
  real_estate_marketing: '16:9',
  business_card: '3:2',
  kakao_banner: '2:1',
  youtube_intro: '16:9',
  real_estate_tour: '16:9',
  brand_video: '16:9',
  product_reveal: '16:9',
  cinematic_ad: '16:9',
  reels: '9:16',
  youtube_shorts: '9:16',
  tiktok: '9:16',
  shortform_ad: '9:16',
};

export const AR_OPTIONS = [
  { id: '16:9', label: '16:9 (와이드)' },
  { id: '9:16', label: '9:16 (세로)' },
  { id: '1:1', label: '1:1 (정사각)' },
  { id: '4:5', label: '4:5 (인스타 세로)' },
  { id: '3:2', label: '3:2 (사진)' },
  { id: '2:1', label: '2:1 (배너)' },
  { id: '4:3', label: '4:3 (클래식)' },
];

export const STYLIZE_MAP: Record<string, number> = {
  real_estate_listing: 100,
  real_estate_marketing: 120,
  real_estate_tour: 150,
  landing_page: 250,
  youtube_thumbnail: 350,
  blog_header: 200,
  blog_content: 180,
  instagram_feed: 300,
  instagram_story: 350,
  naver_blog: 200,
  banner_ad: 250,
  business_card: 150,
  kakao_banner: 200,
  youtube_intro: 250,
  brand_video: 300,
  product_reveal: 250,
  cinematic_ad: 350,
  reels: 400,
  youtube_shorts: 400,
  tiktok: 400,
  shortform_ad: 380,
};
