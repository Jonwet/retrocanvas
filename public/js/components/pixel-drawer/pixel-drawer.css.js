export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
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
`
