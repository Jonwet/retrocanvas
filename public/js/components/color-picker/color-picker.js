customElements.define('color-picker',

  /* eslint-disable jsdoc/require-jsdoc */

  /**
   *
   */
  class ColorPicker extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.createColorPickerUI()
    }

    createColorPickerUI () {
      const wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'color-picker')

      const label = document.createElement('label')
      label.textContent = 'Brush color: '

      const colorInput = document.createElement('input')
      colorInput.setAttribute('type', 'color')
      colorInput.value = '#000000' // Default color

      wrapper.appendChild(label)
      wrapper.appendChild(colorInput)

      this.shadowRoot.appendChild(wrapper)

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
