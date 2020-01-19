const varsInputTextArea = document.getElementById('varsInputTextArea') as HTMLInputElement
const circleCheck = document.getElementById('circle') as HTMLInputElement
const rectangleCheck = document.getElementById('rectangle') as HTMLInputElement
const textError = document.querySelector('.error')

const clearBtnActions = () => {
  varsInputTextArea.value = ''
  circleCheck.checked = true
  rectangleCheck.checked = false
  textError.innerHTML = '';
  varsInputTextArea.classList.remove('textareaError')
}

const textAreaFocusAfterError = () => {
  varsInputTextArea.classList.remove('textareaError')
  textError.innerHTML = '';
}

document.getElementById('clear').addEventListener('click', clearBtnActions)
varsInputTextArea.addEventListener('focus', textAreaFocusAfterError)

document.getElementById('send').onclick = () => {
  const text = varsInputTextArea.value
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
    varsInputTextArea.classList.add('textareaError')
}

onmessage = (e) => {
  e.data.pluginMessage === 'draw_error' ? textError.innerHTML = 'Syntax error, check data' : '';
}