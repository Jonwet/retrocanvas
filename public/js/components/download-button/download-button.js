customElements.define('download-button',

  /* eslint-disable jsdoc/require-jsdoc */

  class DownloadButton extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.renderButton()
    }

    renderButton () {
      const wrapper = document.createElement('div')
      const button = document.createElement('button')
      button.textContent = 'Download Artwork'

      const style = document.createElement('style')
      style.textContent = `
          div {
            margin-top: 16px;
          }
          button {
            padding: 8px 16px;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            background-color:rgb(0, 255, 234);
            color: white;
          }
          button:hover {
            background-color:rgb(0, 255, 234);
          }
        `

      wrapper.appendChild(button)
      this.shadowRoot.append(style, wrapper)

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
