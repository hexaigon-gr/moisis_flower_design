import fs from "fs";
import path from "path";

/**
 * Scans a folder like public/images/events/wedding/ for numbered images (1.jpg, 2.jpg, ...).
 * Image 1.jpg is the primary/hero image.
 * Returns public URL paths sorted by number.
 */
export function getImages(
  category: "events" | "occasions",
  slug: string
): string[] {
  const dir = path.join(process.cwd(), "public/images", category, slug);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  const imageFiles = files
    .filter((f) => /^\d+\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));

  return imageFiles.map((f) => `/images/${category}/${slug}/${f}`);
}
