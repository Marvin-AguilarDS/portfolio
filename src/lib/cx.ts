/**
 * Tiny classNames combiner — joins truthy class strings with spaces.
 * Keeps component markup readable without pulling in a dependency.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
