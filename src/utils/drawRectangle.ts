import { processInputValue } from './processInputValue';
import { hex2rgb, rgb2hsl } from './colorConverter'

const drawRectangle = (parsedString:string) => {

    const [variableName, variableValue] = parsedString.split(":");
    const blackColor = { r: 0.06, g: 0.06, b: 0.06 };
    const rectangleSize = 100;
  
    const rectangle = figma.createRectangle();

    let rectangleColor = processInputValue(variableValue, {})
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
  
    const labelHSLA = figma.createText();
    labelHSLA.x = 0;
    labelHSLA.y = 146;
    labelHSLA.fontSize = 14;
    labelHSLA.characters =
      `hsla(` +
      `${rgb2hsl(rectangleColor[0], rectangleColor[1], rectangleColor[2]).map((el, index) => index > 0 ? ' ' + el : el)}` + 
      `, ${rectangleColor[3] ? rectangleColor[3] : 1}` + 
      `)`;
    labelHSLA.fills = [
      {
        type: "SOLID",
        color: blackColor
      }
    ];
  
    const labelHEX = figma.createText();
    labelHEX.x = 0;
    labelHEX.y = 170  ;
    labelHEX.fontSize = 14;
    labelHEX.characters = variableValue;
    labelHEX.fills = [
      {
        type: "SOLID",
        color: blackColor
      }
    ];
  
    const nodesGroup = figma.group(
      [rectangle, labelName, labelHSLA, labelHEX],
      figma.currentPage
    );
    nodesGroup.name = variableName;
  
    return nodesGroup;
};

export default drawRectangle;