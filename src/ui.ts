import './ui.scss'

const textbox = document.getElementById('input') as HTMLInputElement
const circleCheck = document.getElementById('circle') as HTMLInputElement
const rectangleCheck = document.getElementById('rectangle') as HTMLInputElement
const textError = document.querySelector('.error')

const clearBtnActions = () => {
  textbox.value = ''
  circleCheck.checked = true
  rectangleCheck.checked = false
  textError.innerHTML = '';
  textbox.classList.remove('textareaError')
}

const focusAfterError = () => {
  textbox.classList.remove('textareaError')
  textError.innerHTML = '';
}

document.getElementById('clear').addEventListener('click', clearBtnActions)
textbox.addEventListener('focus', focusAfterError)

document.getElementById('send').onclick = () => {
  const text = textbox.value
  text ? 
    parent.postMessage({ pluginMessage: 
      { 
        type: 'input', 
        text,
        renderChecked: circleCheck.checked === true ? 'circle' : 'rectangle'
      } 
    }, '*')  
  :
    textError.innerHTML = 'Paste data to textarea';
    textbox.classList.add('textareaError')
}

onmessage = (e) => {
  e.data.pluginMessage === 'draw_error' ? textError.innerHTML = 'Syntax error, check data' : '';
}