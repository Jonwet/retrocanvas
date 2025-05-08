export const htmlTemplate = document.createElement('template')
htmlTemplate.innerHTML = `
<div id="viewport">
        <div id="wrapper">
        <canvas id="gridCanvas" width="512" height="512"></canvas>
        <canvas id="drawCanvas" width="512" height="512"></canvas>
    </div>
</div>
`
