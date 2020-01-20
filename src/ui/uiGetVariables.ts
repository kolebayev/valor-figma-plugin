import { rgb2hex } from '../utils/colorConverter'
const getVarsBtn = document.getElementById('getVars')
const desk = document.getElementById('deskForVars')
const copyVarsBtn = document.getElementById('copyVars')
const textError = document.querySelector('.error_getting')
const clearVarsBtn = document.getElementById('clearVars')

const getVarsFromSelection = () => {
    parent.postMessage({
        pluginMessage:
        {
            type: 'getVariables'
        }
    }, '*')
}

getVarsBtn.addEventListener('click', getVarsFromSelection)

copyVarsBtn.addEventListener('click', () => {
   var el = document.createElement('textarea');
   el.value = desk.innerHTML;
   el.setAttribute('readonly', '');
   el.setAttribute('style','position: absolute: left: -9999px')
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
   copyVarsBtn.textContent = 'Copied!'
   setTimeout(() => {
       copyVarsBtn.innerHTML = 'COPY'
    }, 1000);
});

onmessage = (e) => {
    if (e.data.pluginMessage.status === 'selectionEmpty') {
        textError.innerHTML = 'Select shapes on canvas'
        setTimeout(() => textError.innerHTML = '', 1000);
    } else if (e.data.pluginMessage.status === 'selectionFilled') {
        let varsString = ''
        e.data.pluginMessage.data.forEach(el => {
            let hex = rgb2hex(
                Math.round(el[1].r*255),
                Math.round(el[1].g*255),
                Math.round(el[1].b*255)
            )
            varsString += `${el[0]}: ${hex};\n`
        });
        desk.textContent = varsString
        copyVarsBtn.setAttribute('style', 'display:block')
    }
}

clearVarsBtn.addEventListener('click', ()=> {
    desk.textContent = ''
    copyVarsBtn.setAttribute('style', 'display:none')
})