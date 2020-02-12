const varsInputTextArea = document.getElementById('varsInputTextArea') as HTMLInputElement
const circleCheck = document.getElementById('circle') as HTMLInputElement
const rectangleCheck = document.getElementById('rectangle') as HTMLInputElement
const textError = document.querySelector('.error')
const useSampleData = document.getElementById('use-sample-data')

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
    setTimeout(()=>{
      textError.innerHTML = '';
      varsInputTextArea.classList.remove('textareaError')
    }, 1500)
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

useSampleData.addEventListener('click', ()=> {
  varsInputTextArea.value = 'color-brand-dark: #000;\n--main-bg-color: hsla(0,0%,100%,0.97);\n$color-base-project: rgba(0,65,102,0.2);'
})

// onmessage = (e) => {
  // if (e.data.pluginMessage.error === 'draw_error') {
  //   console.log('DRAW ERROR')
  //   textError.innerHTML = 'Syntax error, check data'
  // }
// }