import { hex2rgb, rgb2hsl } from './colorConverter'

const drawCircle = (parsedString:string) => {

    const [variableName, variableHEX] = parsedString.split(":");

    const blackColor = { r: 0.06, g: 0.06, b: 0.06 };
    const ellipseSize = 60;
    const textPosX: number = ellipseSize * 1.25
  
    const ellipse = figma.createEllipse();
    let ellipseColor;
    console.log('varHex', variableHEX)
    // let opacity;
    if (variableHEX.includes('#') && !variableHEX.includes('rgb')) {
      // work with HEX color
      ellipseColor = hex2rgb(variableHEX);
    } else if (!variableHEX.includes('#') && variableHEX.includes('rgb')) {
      //work with RGB
      let clearString = variableHEX.substring(variableHEX.indexOf('(') + 1, variableHEX.indexOf(')'));
      ellipseColor = clearString.split(',')
      ellipseColor = ellipseColor.map(Number);
      for (let i = 0; i < 3; i++) {
        ellipseColor[i] /= 255
      }
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
    // ellipse.opacity = ellipseColor[3] ? ellipseColor[3] : 1
  
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

export default drawCircle;