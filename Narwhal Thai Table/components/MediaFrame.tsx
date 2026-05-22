import Image, { type ImageProps } from 'next/image';
import { type CSSProperties, type ReactNode } from 'react';

type Ornament = 'none' | 'corners' | 'inset';

type Props = {
  /** Aspect ratio expressed as CSS aspect-ratio value, e.g. "4/5" */
  ratio?: string;
  ornament?: Ornament;
  /** When provided, renders a next/image. Omit to show only the placeholder. */
  src?: ImageProps['src'];
  alt?: string;
  /** Tells next/image which size slot to download. Defaults to common pattern. */
  sizes?: string;
  /** Prioritize loading (for above-the-fold images) */
  priority?: boolean;
  /** Placeholder JSX shown while no src is provided (or as background art) */
  placeholder?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Universal photo / video container.
 *
 * Wraps next/image so all photography on the site goes through one consistent
 * frame: aspect ratio preserved via CSS var, optional brass-corner ornament,
 * and a stylized placeholder while real photos aren't shot yet.
 *
 * When you drop a file into /public/images, just pass `src="/images/file.jpg"`.
 */
export default function MediaFrame({
  ratio = '4/5',
  ornament = 'none',
  src,
  alt = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  placeholder,
  className,
  style,
}: Props) {
  const dataState = src ? 'loaded' : 'placeholder';
  const classes = ['media-frame', className].filter(Boolean).join(' ');
  return (
    <figure
      className={classes}
      data-state={dataState}
      data-ornament={ornament === 'none' ? undefined : ornament}
      style={{ ['--ratio' as string]: ratio, ...style }}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
        />
      )}
      {placeholder && <div className="media-placeholder">{placeholder}</div>}
    </figure>
  );
}
