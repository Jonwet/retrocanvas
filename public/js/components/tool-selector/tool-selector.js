customElements.define('tool-selector',

  /* eslint-disable jsdoc/require-jsdoc */

  /**
   *
   */
  class extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })

      this.shadowRoot.innerHTML = `
        <style>
          .tools {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
  
          button {
            padding: 0.4rem 1rem;
            border: 1px solid #ccc;
            background: white;
            cursor: pointer;
            font-size: 0.9rem;
          }
  
          button.active {
            background: #eee;
            border-color: #888;

         .slider {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
          }
        </style>
  
        <div class="tools">
          <button id="brush" class="active">Brush</button>
          <button id="eraser">Eraser</button>

          <div class="slider">
            <label for="brushSize">Size:</label>
            <input id="brushSize" type="range" min="1" max="10" value="1">
            <span id="sizeValue">1</span>
          </div>
        </div>
      `
    }

    connectedCallback () {
      const brushBtn = this.shadowRoot.querySelector('#brush')
      const eraserBtn = this.shadowRoot.querySelector('#eraser')
      const brushSizeInput = this.shadowRoot.querySelector('#brushSize')
      const sizeValue = this.shadowRoot.querySelector('#sizeValue')

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
