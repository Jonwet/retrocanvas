import { cssTemplate } from './color-picker.css.js'

customElements.define('color-picker',

  /**
   * Implements a color picker component.
   */
  class ColorPicker extends HTMLElement {
    /**
     * Creates an instance of the ColorPicker component and initializes the shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.createColorPickerUI()
    }

    /**
     * Creates the UI for the color picker, including a label and a color input element.
     */
    createColorPickerUI () {
      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'color-picker')

      wrapper.classList.add('section')
      const label = document.createElement('label')
      label.textContent = 'Brush color: '

      const colorInput = document.createElement('input')
      colorInput.setAttribute('type', 'color')
      colorInput.value = '#000000'

      wrapper.appendChild(label)
      wrapper.appendChild(colorInput)

      this.shadowRoot.append(wrapper)

      colorInput.addEventListener('input', (event) => {
        const color = event.target.value
        this.dispatchEvent(new CustomEvent('color-change', {
          detail: color,
          bubbles: true
        }))
      })
    }
  }
)
