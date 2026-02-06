// Clipboard utility - copy text to clipboard via navigator API

/**
 * Copy text to the system clipboard using the Clipboard API.
 * Returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
