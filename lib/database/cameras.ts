import type { Camera } from '@/types/database';

export const CAMERA_DB: Record<string, Camera> = {
  portrait: {
    id: 'portrait',
    model: 'Canon EOS 5D Mark IV',
    lens: '85mm f/1.8',
    style: 'shallow depth of field, creamy bokeh',
  },
  environmental_portrait: {
    id: 'environmental_portrait',
    model: 'Sony A7R IV',
    lens: '50mm f/2.0',
    style: 'natural depth, environmental context',
  },
  architecture_exterior: {
    id: 'architecture_exterior',
    model: 'Nikon D850',
    lens: '24mm f/8',
    style: 'wide-angle, deep focus, architectural precision',
  },
  architecture_interior: {
    id: 'architecture_interior',
    model: 'Sony A7 III',
    lens: '16-35mm f/2.8',
    style: 'wide-angle interior, natural perspective',
  },
  aerial: {
    id: 'aerial',
    model: 'DJI Mavic 3',
    lens: '24mm equivalent f/2.8',
    style: 'aerial perspective, vast scale',
  },
  product: {
    id: 'product',
    model: 'Canon EOS R5',
    lens: '100mm macro f/2.8',
    style: 'sharp detail, controlled lighting',
  },
  cinematic: {
    id: 'cinematic',
    model: 'Sony FX6',
    lens: '35mm f/1.4',
    style: 'cinematic depth, anamorphic feel',
  },
  landscape: {
    id: 'landscape',
    model: 'Fujifilm GFX 100S',
    lens: '32-64mm f/4',
    style: 'medium format clarity, rich tonality',
  },
  street: {
    id: 'street',
    model: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    style: 'documentary feel, natural grain',
  },
  fashion: {
    id: 'fashion',
    model: 'Hasselblad X2D',
    lens: '90mm f/2.5',
    style: 'medium format, editorial quality',
  },
};
