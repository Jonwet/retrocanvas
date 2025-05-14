import '../nav-buttons/index.js'
import { cssTemplate } from './gallery-view.css.js'
import { createGalleryTemplate } from './gallery-view.html.js'

customElements.define('gallery-view',
  /**
   * Implements a custom element that fetches and displays a gallery of images.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the gallery-view custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
    }

    /**
     * Called when the custom element is inserted into the DOM.
     * Fetches a gallery of images and renders them in the shadow DOM.
     */
    async connectedCallback () {
      const res = await fetch('/retro-canvas/gallery')
      const images = await res.json()

      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(createGalleryTemplate(images).content.cloneNode(true))
    }
  }
)
