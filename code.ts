// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// type FEllipse = {
//   x: number,
//   y: number,
//   name: string,
//   fills: any,
//   type: string
// }
function hex2rgb(hex) {
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
    return [r, g, b];
}
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //   const nodes: SceneNode[] = [];
    //   for (let i = 0; i < msg.count; i++) {
    //     const rect = figma.createRectangle();
    //     rect.x = i * 150;
    //     rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //     figma.currentPage.appendChild(rect);
    //     nodes.push(rect);
    //   }
    //   figma.currentPage.selection = nodes;
    //   figma.viewport.scrollAndZoomIntoView(nodes);
    // }
    if (msg.type === "input") {
        const COMMENTS = /\/\*(.*)\*\//g;
        const NEWLINE = /\r?\n|\r/g;
        const SPACE = /\s/g;
        const nodes = [];
        let variableStrings = msg.text.split(";");
        console.log(variableStrings);
        for (let i = 0; i < variableStrings.length; i++) {
            variableStrings[i] = variableStrings[i]
                .replace(NEWLINE, "")
                .replace(COMMENTS, "")
                .replace("$", "")
                .replace(SPACE, "");
            if (variableStrings[i] !== "") {
                let nameAndColorArr = variableStrings[i].split(":");
                let rgbColor = hex2rgb(nameAndColorArr[1]);
                const ellipse = figma.createEllipse();
                ellipse.y = i * 150;
                ellipse.name = nameAndColorArr[0];
                ellipse.fills = [
                    {
                        type: "SOLID",
                        color: {
                            r: rgbColor[0] / 255,
                            g: rgbColor[1] / 255,
                            b: rgbColor[2] / 255
                        }
                    }
                ];
                figma.currentPage.appendChild(ellipse);
                nodes.push(ellipse);
            }
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    if (msg.type === "call") {
        function traverse(o) {
            for (let i = 0; i < o.length; i++) {
                if (o[i].type === "ELLIPSE" || o[i].type === "RECTANGLE") {
                    // console.log(JSON.stringify(o[i].fills[0].color))
                    if (o[i].name === "TEST") {
                        // color value is read only
                        o[i].fills[0].color = { r: 0, g: 0, b: 0 };
                    }
                }
                else if (o[i].type === "GROUP" || o[i].type === "FRAME") {
                    traverse(o[i].children);
                }
            }
        }
        traverse(figma.currentPage.children);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
