customElements.define('pixel-drawer',

class PixelDrawer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        canvas {
          border: 1px solid #ccc;
        }
      </style>
      <canvas id="canvas" width="512" height="512"></canvas>
    `
  }

  connectedCallback() {
    const canvas = this.shadowRoot.querySelector('#canvas')
    const context = canvas.getContext('2d')

    const pixelSize = 16
    let isDrawing = false
    let lastX = null
    let lastY = null

    const drawGrid = () => {
      context.strokeStyle = '#ddd'
      for (let x = 0; x < canvas.width; x += pixelSize) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, canvas.height)
        context.stroke()
      }
      for (let y = 0; y < canvas.height; y += pixelSize) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(canvas.width, y)
        context.stroke()
      }
    }

    const drawPixel = (x, y) => {
      const gridX = Math.floor(x / pixelSize) * pixelSize
      const gridY = Math.floor(y / pixelSize) * pixelSize
      context.fillStyle = '#000'
      context.fillRect(gridX, gridY, pixelSize, pixelSize)
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
      const rect = canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true
      const { x, y } = getMousePos(e)
      drawPixel(x, y)
      lastX = x
      lastY = y
    })

    canvas.addEventListener('mouseup', () => {
      isDrawing = false
      lastX = null
      lastY = null
    })

    canvas.addEventListener('mouseleave', () => {
      isDrawing = false
      lastX = null
      lastY = null
    })

    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return
      const { x, y } = getMousePos(e)
      drawLine(lastX, lastY, x, y)
      lastX = x
      lastY = y
    })

    drawGrid()
  }
}
)
