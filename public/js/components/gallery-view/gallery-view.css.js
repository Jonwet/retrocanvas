export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      padding: 1rem;
      background: rgb(50, 50, 50);
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      max-width: 800px;
      margin: 2rem auto;
      color: white;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }

    .gallery img {
      width: 100%;
      border-radius: 8px;
      transition: transform 0.3s ease-in-out;
    }

    .gallery img:hover {
      transform: scale(1.05);
    }
  </style>
`
