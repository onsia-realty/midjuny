import type { MotionType } from '@/types/database';

export const VIDEO_MOTION_DB: Record<string, MotionType> = {
  tracking_forward: {
    id: 'tracking_forward',
    prompt: 'camera tracking forward, smooth dolly in toward subject',
    description: 'Smooth forward camera movement approaching the subject',
    contentType: 'VIDEO',
  },
  tracking_lateral: {
    id: 'tracking_lateral',
    prompt: 'lateral tracking shot, camera moving sideways parallel to subject',
    description: 'Camera moves sideways parallel to the subject or scene',
    contentType: 'VIDEO',
  },
  crane_up: {
    id: 'crane_up',
    prompt: 'crane shot rising upward, revealing wider scene',
    description: 'Camera rises vertically revealing a wider view of the scene',
    contentType: 'VIDEO',
  },
  crane_down: {
    id: 'crane_down',
    prompt: 'crane shot descending, closing in on subject',
    description: 'Camera descends vertically closing in on the subject',
    contentType: 'VIDEO',
  },
  dolly_zoom: {
    id: 'dolly_zoom',
    prompt: 'dolly zoom effect, background warping, vertigo effect',
    description: 'Simultaneous dolly and zoom creating disorienting vertigo effect',
    contentType: 'VIDEO',
  },
  orbital: {
    id: 'orbital',
    prompt: 'orbital camera movement, slowly circling around subject',
    description: 'Camera orbits slowly around the subject in a circular path',
    contentType: 'VIDEO',
  },
  fpv_drone: {
    id: 'fpv_drone',
    prompt: 'FPV drone shot, fast dynamic flight through environment',
    description: 'First person view drone flying dynamically through the environment',
    contentType: 'VIDEO',
  },
  steady_walk: {
    id: 'steady_walk',
    prompt: 'steadicam walking shot, smooth following movement',
    description: 'Smooth stabilized walking shot following the subject',
    contentType: 'VIDEO',
  },
  push_in: {
    id: 'push_in',
    prompt: 'slow push in, gradually tightening frame on subject',
    description: 'Slow forward movement gradually tightening the frame on the subject',
    contentType: 'VIDEO',
  },
  pull_out: {
    id: 'pull_out',
    prompt: 'slow pull out, gradually revealing wider scene',
    description: 'Slow backward movement gradually revealing the wider scene',
    contentType: 'VIDEO',
  },
  static_subtle: {
    id: 'static_subtle',
    prompt: 'static camera with subtle ambient movement',
    description: 'Mostly static camera with very subtle natural ambient movement',
    contentType: 'VIDEO',
  },
};

export const SHORTFORM_MOTION_DB: Record<string, MotionType> = {
  wind_hair: {
    id: 'wind_hair',
    prompt: 'gentle wind blowing through hair, natural movement',
    description: 'Subtle wind movement through hair for natural living feel',
    contentType: 'SHORTFORM',
  },
  fabric_flow: {
    id: 'fabric_flow',
    prompt: 'fabric flowing and rippling in gentle breeze',
    description: 'Clothing or fabric flowing with gentle breeze movement',
    contentType: 'SHORTFORM',
  },
  dynamic_pose: {
    id: 'dynamic_pose',
    prompt: 'dynamic pose with subtle body movement, living portrait',
    description: 'Subject with subtle dynamic body movement like a living portrait',
    contentType: 'SHORTFORM',
  },
  particle_float: {
    id: 'particle_float',
    prompt: 'floating particles, dust motes drifting in light',
    description: 'Atmospheric particles or dust motes floating gently in light',
    contentType: 'SHORTFORM',
  },
  water_ripple: {
    id: 'water_ripple',
    prompt: 'water surface rippling, gentle wave movement',
    description: 'Gentle rippling water surface with subtle wave movement',
    contentType: 'SHORTFORM',
  },
  light_flicker: {
    id: 'light_flicker',
    prompt: 'subtle light flickering, shifting illumination',
    description: 'Subtle flickering of light sources creating shifting illumination',
    contentType: 'SHORTFORM',
  },
  smoke_wisp: {
    id: 'smoke_wisp',
    prompt: 'wisps of smoke or mist slowly drifting',
    description: 'Thin wisps of smoke or mist drifting slowly through the scene',
    contentType: 'SHORTFORM',
  },
  bokeh_shift: {
    id: 'bokeh_shift',
    prompt: 'shifting bokeh lights, gentle focus breathing',
    description: 'Background bokeh lights shifting with gentle focus breathing effect',
    contentType: 'SHORTFORM',
  },
};
