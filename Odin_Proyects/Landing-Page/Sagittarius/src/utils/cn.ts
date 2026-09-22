/**
 * Utility: Merge class names conditionally (lightweight clsx alternative)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}