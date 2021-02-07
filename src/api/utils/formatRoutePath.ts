export function formatRoutePath(path: string): string {
  return path.replace(/^\/*/, '').replace(/\/*$/, '');
}
