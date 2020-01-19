import { rgb2hex } from '../utils/colorConverter'
const getVarsBtn = document.getElementById('getVars')
const desk = document.getElementById('deskForVars')
const copyVarsBtn = document.getElementById('copyVars')
const textError = document.querySelector('.error_getting')

const getVarsFromSelection = () => {
    parent.postMessage({
        pluginMessage:
        {
            type: 'getVariables'
        }
    }, '*')
}

getVarsBtn.addEventListener('click', getVarsFromSelection)

// copyVarsBtn.addEventListener('click', () => {
//    var el = document.createElement('textarea');
//    el.value = desk.innerHTML;
//    el.setAttribute('readonly', '');
//    el.setAttribute('style','position: absolute: left: -9999px')
//    document.body.appendChild(el);
//    el.select();
//    document.execCommand('copy');
//    document.body.removeChild(el);
// });

onmessage = (e) => {
    if (e.data.pluginMessage.status === 'selectionEmpty') {
        // alert('emptySelection')
        textError.innerHTML = 'Select shapes on canvas'
        setTimeout(() => textError.innerHTML = '', 1500);
    } else if (e.data.pluginMessage.status === 'selectionFilled') {
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