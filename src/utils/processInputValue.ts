function getSnack (type) {
    var snack;
    function isDrink () {
      return snack = 'Drink';
    }
    function isFood () {
      return snack = 'Food';
    }
    var snacks = {
      'coke': isDrink,
      'pepsi': isDrink,
      'cookies': isFood,
      'crisps': isFood,
    };
    return snacks[type]();
  }
  
  var snack = getSnack('coke');
  console.log(snack); // 'Drink'

  let variableValue, ellipseColor;
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

  let conf = {
    labelHEX: true,
    labelRGBA: true,
    labelHSLA: true
  }

  export const processInputValue = (variableValue:string, labelsConfig:object) => {

    const valueTypes = {
      isRGBA: variableValue.includes('rgb') && !variableValue.includes('#'),
      isHEX: variableValue.includes('#') && !variableValue.includes('rgb'),
      isHSLA: variableValue.includes('hsl') && !variableValue.includes('#') && !variableValue.includes('rgb')
    }

    const getValueType = (obj) => {
      let trueIdx = Object.values(obj).indexOf(true)
      return Object.keys(obj)[trueIdx]
    }

    getValueType(valueTypes)
  }