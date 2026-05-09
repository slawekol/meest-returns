import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export interface MaterialIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Material Symbols Outlined icon name, e.g. "location_on", "qr_code_2". */
  name: string;
  /** Pixel size; maps to inline font-size. */
  size?: number;
  /** 0 = outlined (default), 1 = filled. */
  filled?: boolean;
  /** Stroke weight 100..700. Default 400. */
  weight?: number;
}

export function MaterialIcon({
  name,
  size = 20,
  filled = false,
  weight = 400,
  className,
  style,
  ...props
}: MaterialIconProps) {
  const merged: CSSProperties = {
    fontSize: size,
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}`,
    ...style,
  };
  return (
    <span
      aria-hidden="true"
      className={cn('material-symbols-outlined leading-none select-none', className)}
      style={merged}
      {...props}
    >
      {name}
    </span>
  );
}
