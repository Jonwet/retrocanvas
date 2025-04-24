customElements.define('pixel-drawer',

class PixelDrawer extends HTMLElement {
  constructor() {
    super()
    this.currentTool = 'brush'
    this.brushSize = 1
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        #wrapper {
          position: relative;
          width: 512px;
          height: 512px;
        }

        canvas {
          position: absolute;
          top: 0;
          left: 0;
          border: 1px solid #ccc;
        }

        #drawCanvas {
          background-color: transparent;
        }
      </style>

      <div id="wrapper">
        <canvas id="gridCanvas" width="512" height="512"></canvas>
        <canvas id="drawCanvas" width="512" height="512"></canvas>
      </div>
    `
  }

  connectedCallback() {
    const gridCanvas = this.shadowRoot.querySelector('#gridCanvas')
    const drawCanvas = this.shadowRoot.querySelector('#drawCanvas')

    const gridContext = gridCanvas.getContext('2d')
    const drawContext = drawCanvas.getContext('2d')

    const pixelSize = 16
    let isDrawing = false
    let lastX = null
    let lastY = null

    const drawGrid = () => {
      // Fill background white
      gridContext.fillStyle = '#fff'
      gridContext.fillRect(0, 0, gridCanvas.width, gridCanvas.height)

      // Draw grid lines
      gridContext.strokeStyle = '#ddd'
      for (let x = 0; x < gridCanvas.width; x += pixelSize) {
        gridContext.beginPath()
        gridContext.moveTo(x, 0)
        gridContext.lineTo(x, gridCanvas.height)
        gridContext.stroke()
      }
      for (let y = 0; y < gridCanvas.height; y += pixelSize) {
        gridContext.beginPath()
        gridContext.moveTo(0, y)
        gridContext.lineTo(gridCanvas.width, y)
        gridContext.stroke()
      }
    }

    const drawPixel = (x, y) => {
      const size = pixelSize * this.brushSize
    
      const gridX = Math.floor((x - size / 2) / pixelSize) * pixelSize
      const gridY = Math.floor((y - size / 2) / pixelSize) * pixelSize
    
      if (this.currentTool === 'eraser') {
        drawContext.clearRect(gridX, gridY, size, size)
      } else {
        drawContext.fillStyle = this.brushColor || '#000'
        drawContext.fillRect(gridX, gridY, size, size)
      }
    }
    

    const drawLine = (x0, y0, x1, y1) => {
      const dx = x1 - x0
      const dy = y1 - y0
      const steps = Math.max(Math.abs(dx), Math.abs(dy))
      for (let i = 0; i <= steps; i++) {
        const x = x0 + (dx * i) / steps
        const y = y0 + (dy * i) / steps
        drawPixel(x, y)
      }
    }

    const getMousePos = (e) => {
      const rect = drawCanvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    drawCanvas.addEventListener('mousedown', (e) => {
      isDrawing = true
      const { x, y } = getMousePos(e)
      drawPixel(x, y)
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

    drawCanvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return
      const { x, y } = getMousePos(e)
      drawLine(lastX, lastY, x, y)
      lastX = x
      lastY = y
    })

    drawGrid()
  }

  setTool(tool) {
    if (['brush', 'eraser'].includes(tool)) {
      this.currentTool = tool
    }
  }

  setBrushSize(size) {
    this.brushSize = parseInt(size, 10) || 1
  }

  setBrushColor(color) {
    this.brushColor = color;
  }
}
)
