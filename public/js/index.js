const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pixelSize = 16;
let isDrawing = false;
let lastX = null;
let lastY = null;

function drawGrid() {
  ctx.strokeStyle = "#ddd";
  for (let x = 0; x < canvas.width; x += pixelSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += pixelSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawPixel(x, y) {
  const gridX = Math.floor(x / pixelSize) * pixelSize;
  const gridY = Math.floor(y / pixelSize) * pixelSize;
  ctx.fillStyle = "#000";
  ctx.fillRect(gridX, gridY, pixelSize, pixelSize);
}

function drawLine(x0, y0, x1, y1) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i <= steps; i++) {
    const x = x0 + (dx * i) / steps;
    const y = y0 + (dy * i) / steps;
    drawPixel(x, y);
  }
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const { x, y } = getMousePos(e);
  drawPixel(x, y);
  lastX = x;
  lastY = y;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  lastX = null;
  lastY = null;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
  lastX = null;
  lastY = null;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const { x, y } = getMousePos(e);
  drawLine(lastX, lastY, x, y);
  lastX = x;
  lastY = y;
});

drawGrid();
