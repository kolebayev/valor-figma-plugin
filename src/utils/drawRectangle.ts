import { hex2rgb, rgb2hsl } from './colorConverter'

const drawRectangle = (parsedString:string) => {

    const [variableName, variableHEX] = parsedString.split(":");
    const blackColor = { r: 0.06, g: 0.06, b: 0.06 };
    const rectangleSize = 100;
  
    const rectangle = figma.createRectangle();

    let rectangleColor;
    console.log('varHex', variableHEX)
    // let opacity;
    if (variableHEX.includes('#') && !variableHEX.includes('rgb')) {
      // work with HEX color
      rectangleColor = hex2rgb(variableHEX);
    } else if (!variableHEX.includes('#') && variableHEX.includes('rgb')) {
      //work with RGB
      let clearString = variableHEX.substring(variableHEX.indexOf('(') + 1, variableHEX.indexOf(')'));
      rectangleColor = clearString.split(',')
      rectangleColor = rectangleColor.map(Number);
      for (let i = 0; i < 3; i++) {
        rectangleColor[i] /= 255
      }
    }


    
    rectangle.y = 0;
    rectangle.x = 0;
    rectangle.name = variableName;
    rectangle.resize(rectangleSize, rectangleSize);
    rectangle.fills = [
      {
        type: "SOLID",
        color: {
          r: rectangleColor[0],
          g: rectangleColor[1],
          b: rectangleColor[2]
        },
        opacity: rectangleColor[3] ? rectangleColor[3] : 1
      }
    ];
  
    const labelName = figma.createText();
    labelName.x = 0;
    labelName.y = 115;
    labelName.fontSize = 18;
    labelName.characters = variableName;
    labelName.fills = [
      {
        type: "SOLID",
        color: blackColor
      }
    ];
  
    const labelHSL = figma.createText();
    labelHSL.x = 0;
    labelHSL.y = 146;
    labelHSL.fontSize = 14;
    labelHSL.characters =
      `hsl(` + rgb2hsl(rectangleColor[0], rectangleColor[1], rectangleColor[2]) + `)`;
    labelHSL.fills = [
      {
        type: "SOLID",
        color: blackColor
      }
    ];
  
    const labelHEX = figma.createText();
    labelHEX.x = 0;
    labelHEX.y = 170  ;
    labelHEX.fontSize = 14;
    labelHEX.characters = variableHEX;
    labelHEX.fills = [
      {
        type: "SOLID",
        color: blackColor
      }
    ];
  
    const nodesGroup = figma.group(
      [rectangle, labelName, labelHSL, labelHEX],
      figma.currentPage
    );
    nodesGroup.name = variableName;
  
    return nodesGroup;
};

export default drawRectangle;