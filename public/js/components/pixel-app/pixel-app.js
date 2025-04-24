import '../pixel-drawer/index.js'
import '../tool-selector/index.js'
import '../color-picker/index.js'

customElements.define('pixel-app', 
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = `
        <tool-selector></tool-selector>
        <pixel-drawer></pixel-drawer>
        <color-picker></color-picker>
      `
    }

    connectedCallback() {
      const canvas = this.shadowRoot.querySelector('pixel-drawer')

      this.shadowRoot.addEventListener('tool-change', (event) => {
        canvas.setTool?.(event.detail)
    })

    this.shadowRoot.addEventListener('brush-size-change', (event) => {
        canvas.setBrushSize?.(event.detail)
      })

      this.shadowRoot.addEventListener('color-change', (e) => {
        canvas.setBrushColor?.(e.detail)
      })
   }
  }
)