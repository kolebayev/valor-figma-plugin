import { hex2rgb, hsl2rgb } from './colorConverter';

export const processInputValue = (
  variableValue: string,
  labelsConfig: object
) => {
  const valueTypes = {
    isRGBА: variableValue.includes("rgb"),
    isHEX: variableValue.includes("#"),
    isHSLА: variableValue.includes("hsl")
  };

  const getValueType = (obj: object) => {
    let trueIdx = Object.values(obj).indexOf(true);
    return Object.keys(obj)[trueIdx];
  };

  const processRGBА = (variableValue: string) => {
    // additional check for prevent executing processRGBA() in processInputValue() return
    if (valueTypes.isRGBА) {
      let clearString: string = variableValue.substring(
        variableValue.indexOf("(") + 1,
        variableValue.indexOf(")")
      );
      let shapeColor: string[] | number[] = clearString.split(",").map(Number);
      let i = 0;
      while (i < 3) {
        shapeColor[i] /= 255;
        i++;
      }
      // array
      return shapeColor;
    } else {
      return
    }
  };

  const processHEX = (variableValue: string) => {
    // additional check for prevent executing processHEX() in processInputValue() return
    if (valueTypes.isHEX) {
      // array
      return hex2rgb(variableValue);
    } else { return }
  };

  const processHSLА = (variableValue: string) => {
    // additional check for prevent executing processHSLА() in processInputValue() return
    if (valueTypes.isHSLА) {
      let clearString: string = variableValue.substring(
        variableValue.indexOf("(") + 1,
        variableValue.indexOf(")")
      );
      let shapeColor: string[] | number[] = clearString.split(",");
  
      let i = 0;
      while (i < 3) {
        shapeColor[i] = shapeColor[i].replace("%", "");
        i++;
      }
  
      shapeColor = shapeColor.map(Number);
      shapeColor[1] = Math.round(shapeColor[1]) / 100;
      shapeColor[2] = Math.round(shapeColor[2]) / 100;
  
      // array
      return [
        ...hsl2rgb(shapeColor[0], shapeColor[1], shapeColor[2]),
        shapeColor[3] ? shapeColor[3] : 1
      ];
    } else {
      return
    }

  };

  return {
    isRGBА: processRGBА(variableValue),
    isHEX: processHEX(variableValue),
    isHSLА: processHSLА(variableValue)
  }[getValueType(valueTypes)];
};
