// next/image does not add the basePath to plain string sources when images are unoptimized,
// so every public asset path goes through this helper (GitHub Pages serves under /repo-name).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
