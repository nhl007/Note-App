export const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/\((\d+),\s*(\d+),\s*(\d+)\)/);

  if (!match) {
    throw new Error('Invalid RGB format');
  }

  const [, r, g, b] = match.map(Number);

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('RGB values should be between 0 and 255');
  }

  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  return `#${hex}`;
};
