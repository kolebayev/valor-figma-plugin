import './ui.css'

document.getElementById('send').onclick = () => {
    const textbox = document.getElementById('input') as HTMLInputElement
    const text = textbox.value
    // const text = `
    //   $color-base-base: #f6fbfd; /* Базовый цвет содержимого, от которого выстраиваются цвета текста, иконок, ... */
    //   $color-base-essential: #002033; /* Базовый цвет поверхностей */
    //   $color-base-project: #0071b2; /* Проектный цвет, от которого выстраивают акцентные состояния */
    //   $color-base-phantom: #f6fbfd; /* Тонирующий цвет, от которого выстраиватся бордеры, паранджа, ... */
    //   $color-base-path: #0096eb;
    // `
    parent.postMessage({ pluginMessage: { type: 'input', text } }, '*')  
  }
  document.getElementById('check').onclick = () => {
    parent.postMessage({ 
      pluginMessage: { 
        type: 'call'
      }
    }, '*')  
  }
  // document.getElementById('create').onclick = () => {
  //   const textbox = document.getElementById('count');
  //   const count = parseInt(textbox.value, 10);
  //   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  // }
  // document.getElementById('cancel').onclick = () => {
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  // }