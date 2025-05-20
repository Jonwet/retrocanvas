export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
      color: white;
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
      background: rgb(50, 50, 50);
      padding: 12px;
      box-sizing: border-box;
      overflow-y: auto;
      color: white;
    }

    .right-sidebar {
      width: 300px;
      background: rgb(50, 50, 50);
      padding: 16px;
      box-sizing: border-box;
      overflow-y: auto;
      color: white;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .canvas-area {
      flex: 1;
      background: rgb(20, 20, 20);
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

    ::slotted([slot="auth"]) {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin: 1rem;
    }

    ::slotted([slot="auth"] form) {
      display: flex;
      align-items: center;
    }

    ::slotted([slot="auth"] button) {
      padding: 0.5rem 1rem;
      background-color: #007acc;
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
`
