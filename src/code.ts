
import drawCircle from './utils/drawCircle'
figma.showUI(__html__);
figma.ui.resize(400 , 516)

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
        let item;
        msg.renderChecked === 'circle' ?
          item = drawCircle(clearStrings[i][j])
        :
          console.log('rect')
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
