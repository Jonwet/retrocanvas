import { cssTemplate } from './canvas-size.css.js'

customElements.define('canvas-size',
  /* eslint-disable jsdoc/require-jsdoc */

  class CanvasSize extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.render()
    }

    render () {
      const wrapper = document.createElement('div')
      const label = document.createElement('label')
      label.textContent = 'Canvas size: '

      const input = document.createElement('input')
      input.type = 'number'
      input.min = '1'
      input.max = '64'
      input.value = '32'

      const button = document.createElement('button')
      button.textContent = 'Set Size'

      wrapper.classList.add('section')
      wrapper.append(label, input, button)
      this.shadowRoot.append(wrapper)

      button.addEventListener('click', () => {
        const size = parseInt(input.value, 10)
        console.log('Set Size Clicked:', size)

        if (size > 0 && size <= 64) {
          this.dispatchEvent(new CustomEvent('canvas-size-change', {
            detail: size,
            bubbles: true,
            composed: true
          }))
        }
      })
    }
  }
)
