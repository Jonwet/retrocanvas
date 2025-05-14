export const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = `
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
          <auth-buttons></auth-buttons>
          <publish-button></publish-button>
          <nav-buttons></nav-buttons>

    </div>
  </div>
</div>
`
