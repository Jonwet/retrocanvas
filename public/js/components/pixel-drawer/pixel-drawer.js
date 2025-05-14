import { cssTemplate } from './pixel-drawer.css.js'
import { htmlTemplate } from './pixel-drawer.html.js'

customElements.define('pixel-drawer',

  /**
   * Implements a pixel drawer component for creating pixel art.
   */
  class PixelDrawer extends HTMLElement {
    /**
     * Creates an instance of the pixel drawer component and initializes its properties.
     */
    constructor () {
      super()
      this.currentTool = 'brush'
      this.brushSize = 1
      this.scale = 1
      this.pixelSize = 24
      this.canvasSize = 16
      this.undoStack = []
      this.redoStack = []

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
      this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))
    }

    /**
     * Called when the custom element is inserted into the DOM.
     */
    connectedCallback () {
      const gridCanvas = this.shadowRoot.querySelector('#gridCanvas')
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')

      let isDrawing = false
      let lastX = null
      let lastY = null

      drawCanvas.addEventListener('mousedown', (event) => {
        this.saveState()
        isDrawing = true
        const { x, y } = this.getMousePos(event)
        this.drawPixel(x, y)
        lastX = x
        lastY = y
      })

      drawCanvas.addEventListener('mouseup', () => {
        isDrawing = false
        lastX = null
        lastY = null
      })

      drawCanvas.addEventListener('mouseleave', () => {
        isDrawing = false
        lastX = null
        lastY = null
      })

      drawCanvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return
        const { x, y } = this.getMousePos(event)
        this.drawLine(lastX, lastY, x, y)
        lastX = x
        lastY = y
      })

      this.setCanvasSize(this.canvasSize)

      const viewport = this.shadowRoot.querySelector('#viewport')

      /**
       * Applies zoom to the grid and draw canvases.
       */
      const applyZoom = () => {
        const scale = this.scale
        drawCanvas.style.transform = `scale(${scale})`
        gridCanvas.style.transform = `scale(${scale})`
        drawCanvas.style.transformOrigin = 'center'
        gridCanvas.style.transformOrigin = 'center'
      }

      viewport.addEventListener('wheel', (event) => {
        if (!event.ctrlKey && event.deltaY !== 0) {
          event.preventDefault()
          const zoomAmount = 0.1
          this.scale = event.deltaY < 0
            ? Math.min(this.scale + zoomAmount, 1.25)
            : Math.max(this.scale - zoomAmount, 1)
          applyZoom()
        }
      }, { passive: false })
    }

    /**
     * Draws the grid on the grid canvas.
     */
    drawGrid () {
      const gridCanvas = this.shadowRoot.querySelector('#gridCanvas')
      const gridContext = gridCanvas.getContext('2d')

      gridContext.fillStyle = '#fff'
      gridContext.fillRect(0, 0, gridCanvas.width, gridCanvas.height)

      gridContext.strokeStyle = '#ddd'
      for (let x = 0; x < gridCanvas.width; x += this.pixelSize) {
        gridContext.beginPath()
        gridContext.moveTo(x, 0)
        gridContext.lineTo(x, gridCanvas.height)
        gridContext.stroke()
      }
      for (let y = 0; y < gridCanvas.height; y += this.pixelSize) {
        gridContext.beginPath()
        gridContext.moveTo(0, y)
        gridContext.lineTo(gridCanvas.width, y)
        gridContext.stroke()
      }
    }

    /**
     * Draws a pixel at the specified coordinates on the canvas.
     *
     * @param {number} x - The x-coordinate where the pixel should be drawn.
     * @param {number} y - The y-coordinate where the pixel should be drawn.
     */
    drawPixel (x, y) {
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const drawContext = drawCanvas.getContext('2d')

      const size = this.pixelSize * this.brushSize
      const offset = Math.floor(this.brushSize / 2) * this.pixelSize
      const snappedX = Math.floor((x - offset) / this.pixelSize) * this.pixelSize
      const snappedY = Math.floor((y - offset) / this.pixelSize) * this.pixelSize

      if (this.currentTool === 'eraser') {
        drawContext.clearRect(snappedX, snappedY, size, size)
      } else {
        drawContext.fillStyle = this.brushColor || '#000'
        drawContext.fillRect(snappedX, snappedY, size, size)
      }
    }

    /**
     * Draws a line between two points on the canvas using the current tool.
     *
     * @param {number} x0 - The x-coordinate of the starting point.
     * @param {number} y0 - The y-coordinate of the starting point.
     * @param {number} x1 - The x-coordinate of the ending point.
     * @param {number} y1 - The y-coordinate of the ending point.
     */
    drawLine (x0, y0, x1, y1) {
      const dx = x1 - x0
      const dy = y1 - y0
      const steps = Math.max(Math.abs(dx), Math.abs(dy))
      for (let i = 0; i <= steps; i++) {
        const x = x0 + (dx * i) / steps
        const y = y0 + (dy * i) / steps
        this.drawPixel(x, y)
      }
    }

    /**
     * Gets the mouse position relative to the canvas, adjusted for scaling.
     *
     * @param {MouseEvent} event - The mouse event containing the position data.
     * @returns {{x: number, y: number}} The x and y coordinates of the mouse position.
     */
    getMousePos (event) {
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const rect = drawCanvas.getBoundingClientRect()
      return {
        x: (event.clientX - rect.left) / this.scale,
        y: (event.clientY - rect.top) / this.scale
      }
    }

    /**
     * Sets the current drawing tool to either 'brush' or 'eraser'.
     *
     * @param {string} tool - The name of the tool to set ('brush' or 'eraser').
     */
    setTool (tool) {
      if (['brush', 'eraser'].includes(tool)) {
        this.currentTool = tool
      }
    }

    /**
     * Sets the size of the brush used for drawing pixels.
     *
     * @param {number} size - The size of the brush in pixels.
     */
    setBrushSize (size) {
      this.brushSize = parseInt(size, 10) || 1
    }

    /**
     * Sets the brush color used for drawing pixels.
     *
     * @param {string} color - The color to set for the brush, specified as a CSS color string.
     */
    setBrushColor (color) {
      this.brushColor = color
    }

    /**
     * Merges the grid and draw canvases into a single image and returns it as a data URL.
     *
     * @param {string} format - The image format for the output (e.g., 'image/png').
     * @returns {string} The data URL of the merged canvas image.
     */
    getMergedCanvas (format = 'image/png') {
      const gridCanvas = this.shadowRoot.querySelector('#gridCanvas')
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')

      const mergedCanvas = document.createElement('canvas')
      mergedCanvas.width = drawCanvas.width
      mergedCanvas.height = drawCanvas.height
      const mergedCtx = mergedCanvas.getContext('2d')

      mergedCtx.drawImage(gridCanvas, 0, 0)
      mergedCtx.drawImage(drawCanvas, 0, 0)

      return mergedCanvas.toDataURL(format)
    }

    /**
     * Sets the size of the canvas and adjusts the pixel size accordingly.
     *
     * @param {number} size - The number of pixels along one side of the canvas.
     */
    setCanvasSize (size) {
      this.canvasSize = size
      const maxCanvasPx = 1024
      const minPixelSize = 16
      this.pixelSize = Math.max(minPixelSize, Math.floor(maxCanvasPx / size))
      this.resizeCanvas()
      this.drawGrid()
    }

    /**
     * Resizes the canvas and its wrapper to fit the specified pixel size.
     */
    resizeCanvas () {
      const px = this.pixelSize
      const sizePx = this.canvasSize * px

      const wrapper = this.shadowRoot.querySelector('#wrapper')
      const gridCanvas = this.shadowRoot.querySelector('#gridCanvas')
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')

      gridCanvas.width = drawCanvas.width = sizePx
      gridCanvas.height = drawCanvas.height = sizePx

      wrapper.style.width = `${sizePx}px`
      wrapper.style.height = `${sizePx}px`
    }

    /**
     * Clears the drawing canvas and saves the current state to the undo stack.
     */
    clearCanvas () {
      this.saveState()
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const ctx = drawCanvas.getContext('2d')
      ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
    }

    /**
     * Saves the current state of the drawing canvas to the undo stack.
     */
    saveState () {
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const dataUrl = drawCanvas.toDataURL()
      this.undoStack.push(dataUrl)
      this.redoStack = []
      if (this.undoStack.length > 50) this.undoStack.shift()
    }

    /**
     * Undoes the last action by restoring the previous state from the undo stack.
     */
    undo () {
      if (this.undoStack.length === 0) return

      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const ctx = drawCanvas.getContext('2d')

      const currentState = drawCanvas.toDataURL()
      const prevState = this.undoStack.pop()
      this.redoStack.push(currentState)

      const img = new Image()

      /**
       * Loads the previous state from the undo stack and applies it to the canvas.
       */
      img.onload = () => {
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = prevState
    }

    /**
     * Redoes the last undone action by restoring the next state from the redo stack.
     */
    redo () {
      if (this.redoStack.length === 0) return

      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const ctx = drawCanvas.getContext('2d')

      const currentState = drawCanvas.toDataURL()
      const nextState = this.redoStack.pop()
      this.undoStack.push(currentState)

      const img = new Image()

      /**
       * Loads the next state from the redo stack and applies it to the canvas.
       */
      img.onload = () => {
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = nextState
    }
  }
)
