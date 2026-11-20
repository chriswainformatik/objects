var canvas = undefined
var ctx = undefined
var gridOn = localStorage.getItem('show-grid') == 'true'
var labelsOn = localStorage.getItem('show-grid-labels') == 'true'

function resizeCanvas() {
    var dpr = window.devicePixelRatio || 1
    var w = canvas.clientWidth
    var h = canvas.clientHeight

    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    redrawCanvas(runner.shapesList)
}

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('the-canvas')
    ctx = canvas.getContext('2d')

    var ro = new ResizeObserver(function () {
        resizeCanvas()
        editor.refresh()
    })
    ro.observe(canvas.parentElement)
    ro.observe(document.getElementById('code-wrapper'))

    // toggle grid and labels if set in local storage
    gridOn = localStorage.getItem('show-grid') == 'true';
    labelsOn = localStorage.getItem('show-grid-labels') == 'true';
    document.getElementById('check-show-grid').checked = gridOn
    document.getElementById('check-show-grid-labels').checked = labelsOn

    document.getElementById('check-show-grid').addEventListener('change', (e) => toggleGrid(e.target.checked))
    document.getElementById('check-show-grid-labels').addEventListener('change', (e) => toggleGridLabels(e.target.checked))

    resizeCanvas()

}, false);

function toggleGrid(enabled) {
    gridOn = enabled
    redrawCanvas(runner.shapesList)
}

function toggleGridLabels(enabled) {
    labelsOn = enabled
    redrawCanvas(runner.shapesList)
}