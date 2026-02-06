import type { CameraAngle } from '@/types/database';
import type { ContentType } from '@/types/prompt';

const ALL_TYPES: ContentType[] = ['IMAGE', 'VIDEO', 'SHORTFORM'];
const IMAGE_VIDEO: ContentType[] = ['IMAGE', 'VIDEO'];
const IMAGE_ONLY: ContentType[] = ['IMAGE'];
const VIDEO_ONLY: ContentType[] = ['VIDEO'];

export const ANGLE_DB: CameraAngle[] = [
  {
    id: 'eye_level',
    prompt: 'eye level shot',
    description: 'Camera at subject eye level for natural perspective',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'low_angle',
    prompt: 'low angle shot, from below',
    description: 'Camera positioned below subject looking up for power and dominance',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'high_angle',
    prompt: 'high angle shot, from above',
    description: 'Camera positioned above subject looking down for vulnerability',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'birds_eye',
    prompt: "bird's eye view, directly from above",
    description: 'Directly overhead top-down perspective',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'dutch_angle',
    prompt: 'dutch angle, tilted frame',
    description: 'Tilted camera for tension and unease',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'over_shoulder',
    prompt: 'over the shoulder shot',
    description: 'Shot framed from behind one subject toward another',
    contentTypes: IMAGE_VIDEO,
  },
  {
    id: 'close_up',
    prompt: 'close-up shot, filling frame',
    description: 'Tight framing on subject face or detail',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'extreme_close_up',
    prompt: 'extreme close-up',
    description: 'Very tight framing on specific detail like eyes or texture',
    contentTypes: IMAGE_ONLY,
  },
  {
    id: 'medium_shot',
    prompt: 'medium shot, waist up',
    description: 'Subject framed from waist up for conversational feel',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'full_body',
    prompt: 'full body shot',
    description: 'Complete subject visible in frame from head to toe',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'wide_shot',
    prompt: 'wide establishing shot',
    description: 'Wide framing showing subject in full environment context',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'pov',
    prompt: 'first person POV shot',
    description: 'First person perspective as seen through subject eyes',
    contentTypes: ALL_TYPES,
  },
  {
    id: 'tracking',
    prompt: 'tracking shot, following subject',
    description: 'Camera moves alongside or behind subject in motion',
    contentTypes: VIDEO_ONLY,
  },
  {
    id: 'crane',
    prompt: 'crane shot, descending/ascending',
    description: 'Camera moves vertically up or down on a crane',
    contentTypes: VIDEO_ONLY,
  },
  {
    id: 'orbital',
    prompt: 'orbital shot, circling subject',
    description: 'Camera orbits around the subject in a circular path',
    contentTypes: VIDEO_ONLY,
  },
];
