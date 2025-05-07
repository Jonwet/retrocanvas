customElements.define('pixel-drawer',

  /* eslint-disable jsdoc/require-jsdoc */

  class PixelDrawer extends HTMLElement {
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
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: auto;
            height: auto;
          }

          #viewport {
            width: auto;
            height: auto;
            overflow: visible;
          }

          #wrapper {
            position: relative;
            width: 512px;
            height: 512px;
          }

          canvas {
            position: absolute;
            top: 0;
            left: 0;
            border: none;
            display: block;
          }

          #drawCanvas {
            background-color: transparent;
          }
        </style>

        <div id="viewport">
          <div id="wrapper">
            <canvas id="gridCanvas" width="512" height="512"></canvas>
            <canvas id="drawCanvas" width="512" height="512"></canvas>
          </div>
        </div>
      `
    }

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

    getMousePos (event) {
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const rect = drawCanvas.getBoundingClientRect()
      return {
        x: (event.clientX - rect.left) / this.scale,
        y: (event.clientY - rect.top) / this.scale
      }
    }

    setTool (tool) {
      if (['brush', 'eraser'].includes(tool)) {
        this.currentTool = tool
      }
    }

    setBrushSize (size) {
      this.brushSize = parseInt(size, 10) || 1
    }

    setBrushColor (color) {
      this.brushColor = color
    }

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

    setCanvasSize (size) {
      this.canvasSize = size
      const maxCanvasPx = 1024
      const minPixelSize = 16
      this.pixelSize = Math.max(minPixelSize, Math.floor(maxCanvasPx / size))
      this.resizeCanvas()
      this.drawGrid()
    }

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

    clearCanvas () {
      this.saveState()
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const ctx = drawCanvas.getContext('2d')
      ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
    }

    saveState () {
      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const dataUrl = drawCanvas.toDataURL()
      this.undoStack.push(dataUrl)
      this.redoStack = []
      if (this.undoStack.length > 50) this.undoStack.shift()
    }

    undo () {
      if (this.undoStack.length === 0) return

      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const ctx = drawCanvas.getContext('2d')

      const currentState = drawCanvas.toDataURL()
      const prevState = this.undoStack.pop()
      this.redoStack.push(currentState)

      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = prevState
    }

    redo () {
      if (this.redoStack.length === 0) return

      const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')
      const ctx = drawCanvas.getContext('2d')

      const currentState = drawCanvas.toDataURL()
      const nextState = this.redoStack.pop()
      this.undoStack.push(currentState)

      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = nextState
    }
  }
)
