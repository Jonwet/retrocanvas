import { cssTemplate } from './tool-selector.css.js'
import { htmlTemplate } from './tool-selector.html.js'

customElements.define('tool-selector',

  /**
   * Implements a tool selector component for a drawing application.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the ToolSelector component and initializes its shadow DOM.
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
      const brushBtn = this.shadowRoot.querySelector('#brush')
      const eraserBtn = this.shadowRoot.querySelector('#eraser')
      const clearBtn = this.shadowRoot.querySelector('#clear')
      const undoBtn = this.shadowRoot.querySelector('#undo')
      const redoBtn = this.shadowRoot.querySelector('#redo')
      const brushSizeInput = this.shadowRoot.querySelector('#brushSize')
      const sizeValue = this.shadowRoot.querySelector('#sizeValue')

      /**
       * Sets the active tool by toggling the 'active' class on the corresponding button.
       *
       * @param {string} tool - The name of the tool to activate ('brush' or 'eraser').
       */
      const setActive = (tool) => {
        brushBtn.classList.toggle('active', tool === 'brush')
        eraserBtn.classList.toggle('active', tool === 'eraser')
      }

      brushBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('tool-change', {
          detail: 'brush',
          bubbles: true
        }))
        setActive('brush')
      })

      eraserBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('tool-change', {
          detail: 'eraser',
          bubbles: true
        }))
        setActive('eraser')
      })

      clearBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('clear-canvas', {
          bubbles: true
        }))
      })

      undoBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('undo', {
          bubbles: true
        }))
      })

      redoBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('redo', {
          bubbles: true
        }))
      })

      brushSizeInput.addEventListener('input', () => {
        const size = parseInt(brushSizeInput.value, 10)
        sizeValue.textContent = size
        this.dispatchEvent(new CustomEvent('brush-size-change', {
          detail: size,
          bubbles: true
        }))
      })

      this.dispatchEvent(new CustomEvent('tool-change', {
        detail: 'brush',
        bubbles: true
      }))

      this.dispatchEvent(new CustomEvent('brush-size-change', {
        detail: 1,
        bubbles: true
      }))
    }
  }
)
