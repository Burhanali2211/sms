import type { CSSProperties } from 'react';

export const E  = '#059669';
export const EL = '#d1fae5';
export const EM = '#6ee7b7';

export const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: '0 2px 16px rgba(5,150,105,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
  border: '1px solid rgba(255,255,255,0.68)',
  borderRadius: '1rem',
};

export const tile = (color = E): CSSProperties => ({
  background: `linear-gradient(135deg, ${color}18, ${color}30)`,
  boxShadow: `0 2px 6px ${color}28`,
  borderRadius: '0.5rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
});

export type WidgetSize = 'sm' | 'md' | 'lg';
