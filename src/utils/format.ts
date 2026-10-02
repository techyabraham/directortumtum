import { formatNairaValue } from './format-core.js';

export function formatNaira(amount: number): string {
  return formatNairaValue(amount);
}
