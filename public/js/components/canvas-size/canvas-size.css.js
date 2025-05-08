export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .section {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: white;
    }

    input {
      width: 60px;
    }
  </style>
`
