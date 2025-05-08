export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
  <style>
    .color-picker {
      margin-top: 16px;
      color: white;
      display: inline-block;
    }
    
    label {
      font-family: sans-serif;
      margin-right: 8px;
      color: white;
    }
          
    .section {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    input[type="color"] {
      width: 128px;
      height: 128px;
      border: none;
      padding: 0;
    }    
  </style>
`
