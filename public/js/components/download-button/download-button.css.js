export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    div {
      margin-top: 16px;
    }
    
    button {
      padding: 0.4rem 1rem;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .section {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: white;
    }
  </style>
`
