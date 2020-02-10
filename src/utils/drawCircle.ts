import { hex2rgb, rgb2hsl, hsl2rgb } from './colorConverter'

const drawCircle = (parsedString: string) => {

  let [variableName, variableValue] = parsedString.split(":");

  const blackColor = { r: 0.06, g: 0.06, b: 0.06 };
  const ellipseSize: number = 60;
  const textPosX: number = ellipseSize * 1.25

  const ellipse = figma.createEllipse();
  // const ellipseColor = hex2rgb(variableValue);
  let ellipseColor;

  if (variableValue.includes('#') && !variableValue.includes('rgb')) {
    // work with HEX input format
    ellipseColor = hex2rgb(variableValue);
  } else if (!variableValue.includes('#') && variableValue.includes('rgb')) {
    //work with RGB input format
    let clearString = variableValue.substring(variableValue.indexOf('(') + 1, variableValue.indexOf(')'));
    ellipseColor = clearString.split(',')
    ellipseColor = ellipseColor.map(Number);
    for (let i = 0; i < 3; i++) {
      ellipseColor[i] /= 255
    }
  } else if (variableValue.includes('hsl') && !variableValue.includes('#') && !variableValue.includes('rgb')) {
    // work with HSL input format
    let clearString = variableValue.substring(variableValue.indexOf('(') + 1, variableValue.indexOf(')'));
    ellipseColor = clearString.split(',')
    console.log(ellipseColor)
    for (let i = 1; i < 3; i++) {
      ellipseColor[i] = ellipseColor[i].replace('%', '')
    }
    ellipseColor = ellipseColor.map(Number);
    ellipseColor[1] = Math.round(ellipseColor[1]) / 100
    ellipseColor[2] = Math.round(ellipseColor[2]) / 100

    ellipseColor = [...hsl2rgb(ellipseColor[0], ellipseColor[1], ellipseColor[2]), ellipseColor[3]]
    variableValue = ellipseColor;
    console.log(ellipseColor)
  }

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
      },
      opacity: ellipseColor[3] ? ellipseColor[3] : 1
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
      color: blackColor,
      opacity: 1
    }
  ];

  const labelHSLA = figma.createText();
  labelHSLA.x = textPosX;
  labelHSLA.y = 27;
  labelHSLA.fontSize = 14;
  labelHSLA.characters =
    `hsla(` +
    `${rgb2hsl(ellipseColor[0], ellipseColor[1], ellipseColor[2]).map((el, index) => index > 0 ? ' ' + el : el)}` + 
    `, ${ellipseColor[3] ? ellipseColor[3] : 1}` + 
    `)`;
  labelHSLA.fills = [
    {
      type: "SOLID",
      color: blackColor,
      opacity: 1
    }
  ];

  const labelHEX = figma.createText();
  labelHEX.x = textPosX;
  labelHEX.y = 47;
  labelHEX.fontSize = 14;
  labelHEX.characters = variableValue;
  labelHEX.fills = [
    {
      type: "SOLID",
      color: blackColor,
      opacity: 1
    }
  ];

  const nodesGroup = figma.group(
    [ellipse, labelName, labelHSLA, labelHEX],
    figma.currentPage
  );
  nodesGroup.name = variableName;

  return nodesGroup;

};

export default drawCircle;