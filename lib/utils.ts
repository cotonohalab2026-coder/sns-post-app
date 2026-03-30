import { ColorPalette, COLOR_SCHEMES, FREQUENCY_OPTIONS } from "./constants";

export function getColorPalette(colorScheme: string): ColorPalette {
  return (
    COLOR_SCHEMES.find((c) => c.label === colorScheme) || COLOR_SCHEMES[0]
  );
}

export function getNextPostDate(frequency: string, lastPostDate: string | null): string {
  const freq = FREQUENCY_OPTIONS.find((f) => f.value === frequency);
  const days = freq?.days || 7;
  const base = lastPostDate ? new Date(lastPostDate) : new Date();
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  const y = next.getFullYear();
  const m = String(next.getMonth() + 1).padStart(2, "0");
  const d = String(next.getDate()).padStart(2, "0");
  return `${y}年${m}月${d}日`;
}

export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${h}:${min}`;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function compressImage(base64: string, maxWidth = 800): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(base64);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = base64;
  });
}
