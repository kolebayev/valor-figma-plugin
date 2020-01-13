function rgb2hsl(r, g, b) {
  // const r = rgb[0] / 255;
  // const g = rgb[1] / 255;
  // const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

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
    Math.ceil(h.toFixed(2)),
    Math.ceil((s * 100).toFixed(2)),
    Math.ceil((l * 100).toFixed(2))
  ];
}

function hex2rgb(hex) {
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

  return [r, g, b];
}

function Color(name, hsl, a) {
  this.name = name;
  this.hsla = [hsl, a].flat();
}

const variablesMap = {
  "color-base-base": [
    "color-typo-primary",
    "color-typo-secondary",
    "color-typo-ghost",
    "color-typo-disable"
  ],
  "color-base-essential": ["color-bg-default", "color-bg-soft"],
  "color-base-project": ["color-bg-brand", "color-typo-brand"],
  "color-base-phantom": [
    "color-bg-border",
    "color-bg-stripe",
    "color-bg-ghost",
    "color-bg-tone"
  ],
  "color-base-path": [
    "$color-bg-link",
    "color-link",
    "color-link-minor",
    "color-link-hover"
  ],
  "color-base-success": ["color-bg-success", "color-typo-success"],
  "color-base-alert": ["color-bg-alert", "color-typo-alert"],
  "color-base-warning": ["color-bg-warning", "color-typo-warning"],
  "color-base-caution": ["color-bg-caution", "color-typo-caution"],
  "color-base-normal": ["color-bg-normal", "color-typo-normal"],
  "color-base-additional": ["color-bg-additional", "color-typo-additional"],
  "color-base-critical": ["color-bg-critical", "color-typo-critical"],
  "color-base-system": ["color-bg-system", "color-typo-system"]
};

const FigmaAPIKey = "22576-9145d351-5f79-4878-81de-bd10943145d7";
const FigmaFileID = "vwwHtidFIGvN88g9k4yFfh";

function traverse(o) {
  for (let i = 0; i < o.length; i++) {
    if (o[i].type === "ELLIPSE" || o[i].type === "RECTANGLE") {
      // console.log(o[i].name, o[i].fills[0].color);
      // console.log(JSON.stringify(o[i].fills[0].color))
      bundle.push(
        new ColorObj(o[i].name, o[i].fills[0].color, o[i].fills[0].opacity)
      );
    } else if (o[i].type === "GROUP" || o[i].type === "FRAME") {
      traverse(o[i].children);
    }
  }
}
