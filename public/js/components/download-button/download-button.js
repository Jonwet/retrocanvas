import { cssTemplate } from './download-button.css.js'

customElements.define('download-button',

  /* eslint-disable jsdoc/require-jsdoc */

  class DownloadButton extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.renderButton()
    }

    renderButton () {
      const wrapper = document.createElement('div')
      const button = document.createElement('button')
      button.textContent = 'Download'

      wrapper.classList.add('section')
      wrapper.appendChild(button)
      this.shadowRoot.append(wrapper)

      button.addEventListener('click', () => {
        const format = this.getAttribute('format') || 'png'
        const pixelApp = this.getRootNode().host

        if (!pixelApp) {
          console.error('DownloadButton must be used inside <pixel-app>.')
          return
        }

        const drawer = pixelApp.shadowRoot.querySelector('pixel-drawer')
        if (drawer && typeof drawer.getMergedCanvas === 'function') {
          const dataURL = drawer.getMergedCanvas(`image/${format}`)
          const link = document.createElement('a')
          link.href = dataURL
          link.download = `pixel-art.${format}`
          link.click()
        } else {
          console.error('pixel-drawer or getMergedCanvas() not found.')
        }
      })
    }
  }
)
