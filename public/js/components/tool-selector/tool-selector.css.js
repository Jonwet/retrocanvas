export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
<style>
  .tools {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    color: white;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .slider {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  
  button {
    padding: 0.4rem 1rem;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  button.active {
    background: #eee;
    border-color: #888;

    .slider {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
</style>
`
