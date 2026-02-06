// Parameter builder - constructs Midjourney V7 parameter strings

export interface ParameterInput {
  ar: string;
  stylize: number;
  chaos: number;
  version: number;
  negative: string;
  sref?: string;
  cref?: string;
  oref?: string;
}

/**
 * Build the Midjourney parameter string from input options.
 * Format: --ar {ar} --s {stylize} --v {version} [--chaos {chaos}] [--no {negative}] [--sref] [--cref] [--oref]
 */
export function buildParameters(input: ParameterInput): string {
  const parts: string[] = [];

  parts.push(`--ar ${input.ar}`);
  parts.push(`--s ${input.stylize}`);
  parts.push(`--v ${input.version}`);

  if (input.chaos > 0) {
    parts.push(`--chaos ${input.chaos}`);
  }

  if (input.negative && input.negative.trim() !== '') {
    parts.push(`--no ${input.negative}`);
  }

  if (input.sref && input.sref.trim() !== '') {
    parts.push(`--sref ${input.sref}`);
  }

  if (input.cref && input.cref.trim() !== '') {
    parts.push(`--cref ${input.cref}`);
  }

  if (input.oref && input.oref.trim() !== '') {
    parts.push(`--oref ${input.oref}`);
  }

  return parts.join(' ');
}
