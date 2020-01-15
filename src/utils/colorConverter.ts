export const hex2rgb = (hex) => {
  const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }
  let colorString = match[0];
  if (match[0].length === 3) {
    colorString = colorString
      .split("")
      .map(char => {
        return char + char;
      })
      .join("");
  }
  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xff;
  const g = (integer >> 8) & 0xff;
  const b = integer & 0xff;
  return [r / 255, g / 255, b / 255];
};

export const rgb2hsl = (r: number, g: number, b: number) => {
  // const r = rgb[0] / 255;
  // const g = rgb[1] / 255;
  // const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h: number;
  let s: number;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [
    Math.ceil(parseFloat(h.toFixed(2))),
    Math.ceil(parseFloat((s * 100).toFixed(2))),
    Math.ceil(parseFloat((l * 100).toFixed(2)))
  ];
};

export default { hex2rgb, rgb2hsl }