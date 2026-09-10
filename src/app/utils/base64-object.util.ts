/** Serializes an object as UTF-8 JSON encoded in Base64. */
export function encodeObjectToBase64(value: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');

  return btoa(binary);
}

/** Decodes Base64 JSON and treats the result as the requested type. */
export function decodeObjectFromBase64<T>(value: string): T {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}
