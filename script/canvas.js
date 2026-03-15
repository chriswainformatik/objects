var canvas = undefined
var boxHeight = 325
var gridOn = localStorage.getItem('show-grid') == 'true'
var labelsOn = localStorage.getItem('show-grid-labels') == 'true'

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('the-canvas')

    canvas.width = canvas.clientWidth
    canvas.height = boxHeight

    // set the editor height to match canvas
    editor.setSize(null, boxHeight)

    // toggle grid and labels if set in local storage
    gridOn = localStorage.getItem('show-grid') == 'true';
    labelsOn = localStorage.getItem('show-grid-labels') == 'true';
    document.getElementById('check-show-grid').checked = gridOn
    document.getElementById('check-show-grid-labels').checked = labelsOn

    document.getElementById('check-show-grid').addEventListener('change', (e) => toggleGrid(e.target.checked))
    document.getElementById('check-show-grid-labels').addEventListener('change', (e) => toggleGridLabels(e.target.checked))

    redrawCanvas(runner.shapesList)

}, false);

function toggleGrid(enabled) {
    gridOn = enabled
    redrawCanvas(runner.shapesList)
}

function toggleGridLabels(enabled) {
    labelsOn = enabled
    redrawCanvas(runner.shapesList)
}