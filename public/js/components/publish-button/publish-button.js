import { htmlTemplate } from './publish-button.html.js'
import { cssTemplate } from './publish-button.css.js'

customElements.define('publish-button',
  /**
   * Implements a publish button component.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the PublishButton component and initializes its shadow DOM.
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
      this.shadowRoot.querySelector('#publish').addEventListener('click', async () => {
        const pixelDrawer = document.querySelector('pixel-app')?.shadowRoot
          .querySelector('pixel-drawer')

        if (!pixelDrawer) {
          alert('Drawing component not found!')
          return
        }

        const imageData = pixelDrawer.getMergedCanvas('image/png')

        try {
          const res = await fetch('/retro-canvas/gallery/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ imageData })
          })

          if (res.ok) {
            alert('Your drawing was published!')
          } else {
            const error = await res.json()
            alert('Publish failed: ' + (error.error || res.status))
          }
        } catch (err) {
          alert('Something went wrong while publishing.')
          console.error(err)
        }
      })
    }
  }
)
