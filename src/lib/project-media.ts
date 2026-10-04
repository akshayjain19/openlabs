/** Local portfolio imagery under public/projects/{slug}/ */

export function projectImage(slug: string, file = "desktop.webp") {
  return `/projects/${slug}/${file}`;
}

export function projectDesktopPath(slug: string) {
  return projectImage(slug, "desktop.webp");
}

export function projectMobileWebPath(slug: string) {
  return projectImage(slug, "mobile-web.webp");
}

/** Preferred filenames: desktop.webp, mobile-web.webp, gallery-*.webp — hero/screen-* kept for legacy assets */
export function projectGallery(
  slug: string,
  files = ["gallery-1.webp", "gallery-2.webp", "screen-1.webp", "screen-2.webp"],
) {
  return files.map((file) => projectImage(slug, file));
}

export const LEGACY_DESKTOP = "hero.webp";
