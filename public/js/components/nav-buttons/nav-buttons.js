import { cssTemplate } from './nav-buttons.css.js'
import { htmlTemplate } from './nav-buttons.html.js'

customElements.define('nav-buttons',
  /**
   * Implements a custom element that provides navigation buttons.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the nav-buttons custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }
  }
)
