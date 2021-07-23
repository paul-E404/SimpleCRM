/**
 * Compares values for alphabetical sorting.
 * @param  {number|string} a First value.
 * @param  {number|string} b Second value.
 * @param  {boolean} isAsc Checks ascending order.
 */
export function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}