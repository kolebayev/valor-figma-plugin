import './ui.css'

const textbox = document.getElementById('input') as HTMLInputElement
const circleCheck = document.getElementById('circle')
const rectangleCheck = document.getElementById('rectangle')
const textError = document.querySelector('.error')

document.getElementById('clear').onclick = () => {
  textbox.value = ''
  circleCheck.checked = true
  rectangleCheck.checked = false
  textError.innerHTML = '';
}

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
    // textbox.focus()
    textbox.classList.add('textareaError')
}

textbox.addEventListener('focus', () => {
  textbox.classList.remove('textareaError')
  textError.innerHTML = '';
})

onmessage = (e) => {
  e.data.pluginMessage === 'draw_error' && textError.innerHTML = 'Syntax error, check data'
}

// document.getElementById('check').onclick = () => {
//   parent.postMessage({ 
//     pluginMessage: { 
//       type: 'call'
//     }
//   }, '*')  
// }
  // document.getElementById('create').onclick = () => {
  //   const textbox = document.getElementById('count');
  //   const count = parseInt(textbox.value, 10);
  //   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  // }
  // document.getElementById('cancel').onclick = () => {
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  // }