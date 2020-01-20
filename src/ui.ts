import './ui/ui.scss'
import './ui/uiDrawColors'
import './ui/uiGetVariables'
import { rgb2hex } from './utils/colorConverter'

const checkShowV2C = document.getElementById('checkboxV2C') as HTMLInputElement
const checkShowC2V = document.getElementById('checkboxC2V') as HTMLInputElement

const btnShowV2C = document.querySelector('.header_showV2C') 
const btnShowC2V = document.querySelector('.header_showC2V') 

const layoutV2C = document.querySelector('.layout_V2C')
const layoutC2V = document.querySelector('.layout_C2V')

btnShowV2C.addEventListener('click', function() {
  if (!checkShowV2C.checked) {
    this.classList.add('tabs_active')
    btnShowC2V.classList.remove('tabs_active')
    layoutV2C.classList.add('layout_is-visible')
    layoutC2V.classList.remove('layout_is-visible')
  }
})

btnShowC2V.addEventListener('click', function() {
  if (!checkShowC2V.checked) {
    this.classList.add('tabs_active')
    btnShowV2C.classList.remove('tabs_active')
    layoutC2V.classList.add('layout_is-visible')
    layoutV2C.classList.remove('layout_is-visible')
  }
})