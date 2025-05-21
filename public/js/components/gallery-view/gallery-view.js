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
      console.log('Fetched images:', images)

      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(createGalleryTemplate(images).content.cloneNode(true))

      this.shadowRoot.addEventListener('click', e => {
        const clickedImage = e.target.closest('img')
        const galleryItem = e.target.closest('.item')
        if (!clickedImage || !galleryItem) return

        const modal = document.createElement('div')
        modal.classList.add('modal')
        modal.innerHTML = `
      <div class="modal-content">
        <button class="close" aria-label="Close modal">✖</button>
        <img src="${clickedImage.src}" alt="Enlarged image" />
      </div>
    `

        modal.querySelector('.modal-content').addEventListener('click', e => {
          e.stopPropagation()
        })

        modal.addEventListener('click', () => modal.remove())

        modal.querySelector('.close').addEventListener('click', () => modal.remove())

        this.shadowRoot.appendChild(modal)
      })
    }
  }
)
