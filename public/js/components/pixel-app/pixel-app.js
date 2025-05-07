import '../pixel-drawer/index.js'
import '../tool-selector/index.js'
import '../color-picker/index.js'
import '../download-button/index.js'
import '../canvas-size/index.js'

customElements.define('pixel-app',

  /* eslint-disable jsdoc/require-jsdoc */

  class extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100vh;
          overflow: hidden;
        }

        .app-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .left-sidebar {
          width: 300px;
          background: rgb(220, 220, 220);
          padding: 12px;
          box-sizing: border-box;
          overflow-y: auto;
        }

.right-sidebar {
  width: 300px;
  background: rgb(230, 230, 230);
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}


.canvas-area {
  flex: 1;
  background: rgb(73, 73, 73);
  display: flex;
  justify-content: center;
  align-items: center;
}

        .canvas-scroll-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      </style>

      <div class="app-container">


        <div class="main-content">
          <div class="left-sidebar">
            <tool-selector></tool-selector>
          </div>

          <div class="canvas-area">
            <div class="canvas-scroll-wrapper">
              <pixel-drawer></pixel-drawer>
            </div>
          </div>

          <div class="right-sidebar">
            <color-picker></color-picker>
            <download-button></download-button>
            <canvas-size></canvas-size>
          </div>
        </div>
      </div>
      `
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
