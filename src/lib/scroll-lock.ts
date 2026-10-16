/**
 * Freezes the page behind a full-screen mobile overlay (the chat) and puts it back exactly where it was.
 * Pinning the body with `position: fixed` (rather than only `overflow: hidden`) also stops iOS from
 * scrolling or rubber-banding the page behind an open keyboard.
 */
let saved: { y: number; position: string; top: string; left: string; right: string; width: string; overflow: string } | null = null;

export function lockPageScroll(): void {
  if (saved) return;
  const { style } = document.body;
  saved = { y: window.scrollY, position: style.position, top: style.top, left: style.left, right: style.right, width: style.width, overflow: style.overflow };
  style.position = "fixed";
  style.top = `-${saved.y}px`;
  style.left = "0";
  style.right = "0";
  style.width = "100%";
  style.overflow = "hidden";
}

/** `restore: false` is for when the visitor is navigating away: the new page starts at the top. */
export function unlockPageScroll(restore = true): void {
  if (!saved) return;
  const { style } = document.body;
  const previous = saved;
  saved = null;
  style.position = previous.position;
  style.top = previous.top;
  style.left = previous.left;
  style.right = previous.right;
  style.width = previous.width;
  style.overflow = previous.overflow;
  if (restore) window.scrollTo({ top: previous.y, left: 0, behavior: "instant" });
}
