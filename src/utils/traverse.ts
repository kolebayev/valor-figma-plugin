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