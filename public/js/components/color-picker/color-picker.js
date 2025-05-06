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

      const style = document.createElement('style')
      style.textContent = `
        .color-picker {
          margin-top: 16px;
          display: inline-block;
        }
    
        label {
          font-family: sans-serif;
          margin-right: 8px;
        }
          
  .section {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
    
        input[type="color"] {
          width: 128px;
          height: 128px;
          border: none;
          padding: 0;
        }
      `

      wrapper.classList.add('section')
      const label = document.createElement('label')
      label.textContent = 'Brush color: '

      const colorInput = document.createElement('input')
      colorInput.setAttribute('type', 'color')
      colorInput.value = '#000000'

      wrapper.appendChild(label)
      wrapper.appendChild(colorInput)

      this.shadowRoot.append(style, wrapper)

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
