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
  if (text.length === 0) {
    textError.innerHTML = 'Paste data to textarea';
    varsInputTextArea.classList.add('textareaError')
  } else if (!text.includes(':') || !text.includes(';')) {
    textError.innerHTML = 'Syntax error, check data';
    varsInputTextArea.classList.add('textareaError')
  } else {
    parent.postMessage({ pluginMessage: 
      { 
        type: 'input', 
        text,
        renderChecked: circleCheck.checked === true ? 'circle' : 'rectangle'
      } 
    }, '*')  
  }
}

// onmessage = (e) => {
  // if (e.data.pluginMessage.error === 'draw_error') {
  //   console.log('DRAW ERROR')
  //   textError.innerHTML = 'Syntax error, check data'
  // }
// }