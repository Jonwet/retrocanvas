export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    .auth-buttons {
      display: flex;
      gap: 0.5rem;
    }

    button {
      padding: 1rem 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      background: white;
      border: 1px solid #ccc;
    }
  </style>
`
