import '../pixel-drawer/index.js'
import '../tool-selector/index.js'
import '../color-picker/index.js'
import '../download-button/index.js'
import '../canvas-size/index.js'
import '../auth-buttons/index.js'
import { cssTemplate } from './pixel-app.css.js'
import { htmlTemplate } from './pixel-app.html.js'

customElements.define('pixel-app',

  /* eslint-disable jsdoc/require-jsdoc */

  class extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }

    connectedCallback () {
      const canvas = this.shadowRoot.querySelector('pixel-drawer')

      this.shadowRoot.addEventListener('tool-change', (event) => {
        canvas.setTool?.(event.detail)
      })

      this.shadowRoot.addEventListener('brush-size-change', (event) => {
        canvas.setBrushSize?.(event.detail)
      })

      this.shadowRoot.addEventListener('color-change', (event) => {
        canvas.setBrushColor?.(event.detail)
      })

      this.shadowRoot.addEventListener('canvas-size-change', (event) => {
        canvas.setCanvasSize?.(event.detail)
      })

      this.shadowRoot.addEventListener('clear-canvas', () => {
        canvas.clearCanvas?.()
      })

      this.shadowRoot.addEventListener('undo', () => {
        canvas.undo?.()
      })

      this.shadowRoot.addEventListener('redo', () => {
        canvas.redo?.()
      })
    }
  }
)
