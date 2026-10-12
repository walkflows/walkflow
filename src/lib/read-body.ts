/**
 * Reads a request body as text but stops as soon as it exceeds `maxBytes`, so an oversized or endless
 * body is rejected with 413 by the app itself (cheaply, without buffering it) instead of depending on
 * what a reverse proxy does with it. A declared Content-Length over the limit is rejected before
 * reading anything.
 */
export async function readLimitedText(request: Request, maxBytes: number): Promise<{ ok: true; text: string } | { ok: false }> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return { ok: false };
  if (!request.body) return { ok: true, text: "" };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return { ok: false };
    }
    chunks.push(value);
  }
  return { ok: true, text: new TextDecoder().decode(Buffer.concat(chunks)) };
}
