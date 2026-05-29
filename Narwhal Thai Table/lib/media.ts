import fs from 'node:fs';
import path from 'node:path';

/**
 * Build-time media detection.
 *
 * The whole point: a real photo or video goes live by *dropping a file* into
 * /public — no code edits. These helpers run on the server at build time and
 * check whether the expected file exists on disk, returning its public URL (or
 * null). Because we only hand a `src` to <Image>/<video> when the file is
 * actually present, there are never broken images or 404s in production.
 *
 *   Hero video   → /public/media/hero.mp4 (or .webm)
 *   Hero image   → /public/images/hero.jpg (or .png/.webp/.avif)
 *   Dish photo   → /public/images/dishes/<slug>.jpg (or .png/.webp/.avif)
 *   Chef photo   → /public/images/chef.jpg (or .png/.webp/.avif)
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
const VIDEO_EXTS = ['mp4', 'webm'];

/** First candidate (relative to /public) whose file exists, as a public URL. */
function firstExisting(relPaths: string[]): string | null {
  for (const rel of relPaths) {
    try {
      if (fs.existsSync(path.join(PUBLIC_DIR, rel))) {
        return '/' + rel.split(path.sep).join('/');
      }
    } catch {
      /* ignore unreadable paths — treat as "not present" */
    }
  }
  return null;
}

export type HeroMedia = { video: string | null; image: string | null };

/** Hero background. Video wins if both exist; image acts as poster/fallback. */
export function getHeroMedia(): HeroMedia {
  const video = firstExisting(VIDEO_EXTS.map((e) => `media/hero.${e}`));
  const image = firstExisting([
    ...IMAGE_EXTS.map((e) => `images/hero.${e}`),
    ...IMAGE_EXTS.map((e) => `media/hero.${e}`),
  ]);
  return { video, image };
}

/** Photo for a single dish, matched by slug. */
export function getDishImage(slug: string): string | null {
  return firstExisting(IMAGE_EXTS.map((e) => `images/dishes/${slug}.${e}`));
}

/** Portrait for the chef section. */
export function getChefImage(): string | null {
  return firstExisting([
    ...IMAGE_EXTS.map((e) => `images/chef.${e}`),
    ...IMAGE_EXTS.map((e) => `images/chef-rainny.${e}`),
  ]);
}
