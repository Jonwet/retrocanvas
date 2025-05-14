export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: sans-serif;
      color: black;
      margin-top: 2rem;
    }



    a {
      padding: 0.5rem 1rem;
      background: rgb(255, 255, 255);
      color: black;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.2s;
    }

    a:hover {
      background: rgb(201, 201, 201);
    }
  </style>
`
