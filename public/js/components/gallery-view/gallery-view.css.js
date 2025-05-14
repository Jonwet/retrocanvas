export const cssTemplate = document.createElement('template')
cssTemplate.innerHTML = `
<style>
    .gallery { display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; }
    .item img { max-width: 200px; border: 1px solid #ccc; }
    .item p { text-align: center; color: white; }
</style>
`
