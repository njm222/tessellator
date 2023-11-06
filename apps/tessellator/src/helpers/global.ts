import tunnel from "tunnel-rat";

export const r3f = tunnel();

export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export function openNewTabLink(link: string) {
  // validate
  if (!link) return;
  window.open(link, "_blank");
}

export function copyToClipBoard(word: string) {
  if (!word) return;
  navigator.clipboard.writeText(word);
}
