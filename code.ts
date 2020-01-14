figma.showUI(__html__);

const hex2rgb = hex => {
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

const rgb2hsl = (r: number, g: number, b: number) => {
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

const drawItem = parsedString => {
  const [variableName, variableHEX] = parsedString.split(":");
  const blackColor = { r: 0.06, g: 0.06, b: 0.06 };
  const ellipseSize = 60;
  const textPosX: number = ellipseSize * 1.25

  const ellipse = figma.createEllipse();
  const ellipseColor = hex2rgb(variableHEX);
  ellipse.y = 3;
  ellipse.x = 0;
  ellipse.name = variableName;
  ellipse.resize(ellipseSize, ellipseSize);
  ellipse.fills = [
    {
      type: "SOLID",
      color: {
        r: ellipseColor[0],
        g: ellipseColor[1],
        b: ellipseColor[2]
      }
    }
  ];

  const labelName = figma.createText();
  labelName.x = textPosX;
  labelName.y = 0;
  labelName.fontSize = 18;
  labelName.characters = variableName;
  labelName.fills = [
    {
      type: "SOLID",
      color: blackColor
    }
  ];

  const labelHSL = figma.createText();
  labelHSL.x = textPosX;
  labelHSL.y = 27;
  labelHSL.fontSize = 14;
  labelHSL.characters =
    `hsl(` + rgb2hsl(ellipseColor[0], ellipseColor[1], ellipseColor[2]) + `)`;
  labelHSL.fills = [
    {
      type: "SOLID",
      color: blackColor
    }
  ];

  const labelHEX = figma.createText();
  labelHEX.x = textPosX;
  labelHEX.y = 47;
  labelHEX.fontSize = 14;
  labelHEX.characters = variableHEX;
  labelHEX.fills = [
    {
      type: "SOLID",
      color: blackColor
    }
  ];

  const nodesGroup = figma.group(
    [ellipse, labelName, labelHSL, labelHEX],
    figma.currentPage
  );
  nodesGroup.name = variableName;

  return nodesGroup;
};

figma.ui.onmessage = async msg => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

  if (msg.type === "input") {
    const nodes = [];
    const COMMENTS = /\/\*(.*)\*\//g;
    const NEWLINE = /\r?\n|\r/g;
    const SPACE = /\s/g;

    const inputStrings = msg.text.split(";").map(el => {
      return el.replace(NEWLINE, "")
        .replace(COMMENTS, "")
        .replace("$", "")
        .replace(SPACE, "");
    });

    const variableStrings = inputStrings.filter(function (el) {
      return el != '';
    });
    
    const rowsQty = 5;
    const clearStrings = []; 
    for (let i = 0; i < Math.ceil(variableStrings.length / rowsQty); i++) {
      clearStrings[i] = variableStrings.slice((i * rowsQty), (i * rowsQty) + rowsQty);
    }

    for (let i = 0; i < clearStrings.length; i++) {
      for (let j = 0; j < clearStrings[i].length; j++) {
        let item = drawItem(clearStrings[i][j])
        item.y = j * 100;
        item.x = i * 300
      }
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  // if (msg.type === "call") {
  //     function traverse(o) {
  //         for (let i = 0; i < o.length; i++) {
  //             if (o[i].type === "ELLIPSE" || o[i].type === "RECTANGLE") {
  //                 if (o[i].name === "TEST") {
  //                     // color value is read only
  //                     o[i].fills[0].color = { r: 0, g: 0, b: 0 };
  //                 }
  //             }
  //             else if (o[i].type === "GROUP" || o[i].type === "FRAME") {
  //                 traverse(o[i].children);
  //             }
  //         }
  //     }
  //     traverse(figma.currentPage.children);
  // }
  figma.closePlugin();
};
