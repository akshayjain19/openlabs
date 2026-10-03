/** Local portfolio imagery under public/projects/{slug}/ */
export function projectImage(slug: string, file = "hero.webp") {
  return `/projects/${slug}/${file}`;
}

export function projectGallery(slug: string, files = ["hero.webp", "screen-1.webp", "screen-2.webp"]) {
  return files.map((file) => projectImage(slug, file));
}
