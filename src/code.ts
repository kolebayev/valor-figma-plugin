import drawCircle from './utils/drawCircle'
import drawRectangle from './utils/drawRectangle'
figma.showUI(__html__);
figma.ui.resize(400 , 390)

figma.ui.onmessage = async msg => {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Arial", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  if (msg.type === "input") {
    const nodes = [];
    const COMMENTS = /\/\*(.*)\*\//g;
    const NEWLINE = /\r?\n|\r/g;
    const SPACE = /\s/g;

    const inputStrings = msg.text.split(";").map(el => {
      return el.replace(NEWLINE, "")
        .replace(COMMENTS, "")
        .replace("$", "")
        .replace(SPACE, "")
        .replace('--', '');
    });

    const variableStrings = inputStrings.filter(el => {
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
        if (msg.renderChecked === 'circle') {
          item = drawCircle(clearStrings[i][j])
            item.y = j * 100;
            item.x = i * 300
        } else if (msg.renderChecked === 'rectangle') {
          item = drawRectangle(clearStrings[i][j])
          item.y = j * 250;
          item.x = i * 250 
        }
      }
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'getVariables') {
    let items = figma.currentPage.selection
    if (items.length === 0) {
      figma.ui.postMessage({status: 'selectionEmpty'})
    } else {
      let list = []
      for (const node of items) {
        if (node.type === "ELLIPSE" || node.type === "RECTANGLE" ) {
          console.log(node.fills);
          list.push(
            [
              node.name,
              node.fills[0].color,
              node.fills[0].opacity,
            ]
          );
        } else {
          figma.ui.postMessage({ status: 'selectionPartiallyWrong', data: list })
        }
      }

      figma.ui.postMessage({ status: 'selectionFilled', data: list })
    }
  }

  // figma.closePlugin();
};
