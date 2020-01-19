import { rgb2hex } from '../utils/colorConverter'
const btn = document.getElementById('getVars')
const desk = document.getElementById('deskForVars')


const getVarsFromSelection = () => {
    parent.postMessage({
        pluginMessage:
        {
            type: 'getVariables'
        }
    }, '*')
}

btn.addEventListener('click', getVarsFromSelection)

onmessage = (e) => {
    if (e.data.pluginMessage.status === 'selectionEmpty') {
        alert('emptySelection')
    } else if (e.data.pluginMessage.status === 'selectionFilled') {
        // console.log(e.data.pluginMessage.data)
        let varsString = ''
        e.data.pluginMessage.data.forEach(el => {
            let hex = rgb2hex(
                Math.round(el[1].r*255),
                Math.round(el[1].g*255),
                Math.round(el[1].b*255)
            )
            // el[1] = hex
            varsString += `${el[0]}: ${hex};\n`
        });
        console.log(varsString)
        // const text = 
        desk.textContent = varsString
    }
}