import './ui/ui.scss'
import './ui/uiV2C'
import './ui/uiC2V'

const checkShowV2C = document.getElementById('checkboxV2C') as HTMLInputElement
const checkShowC2V = document.getElementById('checkboxC2V') as HTMLInputElement


const btnShowV2C = document.querySelector('.header_showV2C') 
const btnShowC2V = document.querySelector('.header_showC2V') 

const layoutV2C = document.querySelector('.layout_V2C')
const layoutC2V = document.querySelector('.layout_C2V')



btnShowV2C.addEventListener('click', ()=>{
  if (!checkShowV2C.checked) {
    layoutV2C.classList.add('layout_is-visible')
    layoutC2V.classList.remove('layout_is-visible')
  }
})

btnShowC2V.addEventListener('click', ()=>{
  if (!checkShowC2V.checked) {
    layoutC2V.classList.add('layout_is-visible')
    layoutV2C.classList.remove('layout_is-visible')
  }
})