export const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = `
<div class="tools">
  <div class="button-row">
    <button id="brush" class="active">Brush</button>
    <button id="eraser">Eraser</button>
    <button id="clear">Clear</button>
    <button id="undo">Undo</button>
    <button id="redo">Redo</button>
  </div>

  <div class="slider">
    <label for="brushSize">Size:</label>
    <input id="brushSize" type="range" min="1" max="10" value="1">
    <span id="sizeValue">1</span>
  </div>
</div>
`
