import '../pixel-drawer/index.js'
import '../tool-selector/index.js'
import '../color-picker/index.js'
import '../download-button/index.js'
import '../canvas-size/index.js'
import '../auth-buttons/index.js'
import '../publish-button/index.js'
import '../nav-buttons/index.js'
import { cssTemplate } from './pixel-app.css.js'
import { htmlTemplate } from './pixel-app.html.js'

customElements.define('pixel-app',

  /**
   * Implements a custom element that serves as the main application for a pixel art drawing tool.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the pixel-app custom element and initializes its shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }

    /**
     * Called when the custom element is inserted into the DOM.
     */
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
