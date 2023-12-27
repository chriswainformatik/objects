var canvas = undefined
var cw = -1
var ch = -1

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('the-canvas')

    cw = canvas.clientWidth
    canvas.style.width = cw + 'px'
    //var ch = cw*0.6
    ch = 350
    canvas.style.height = ch + 'px'

    // set the editor height at this point because this script file gets loaded after the editor.js
    editor.setSize(cw, ch)

    // toggle grid and labels if set in local storage
    var enableGrid = localStorage.getItem('show-grid') == 'true';
    toggleGrid(enableGrid)
    document.getElementById('check-show-grid').checked = enableGrid

    var enableGridLabels = localStorage.getItem('show-grid-labels') == 'true';
    toggleGridLabels(enableGridLabels)
    document.getElementById('check-show-grid-labels').checked = enableGridLabels

    document.getElementById('check-show-grid').addEventListener('change', (e) => toggleGrid(e.target.checked))
    document.getElementById('check-show-grid-labels').addEventListener('change', (e) => toggleGridLabels(e.target.checked))

}, false);

function toggleGrid(gridOn) {
    var gridLines = document.getElementsByClassName('grid-line')
    Array.from(gridLines).forEach(gl => gl.parentNode.removeChild(gl))
    
    var gridColor = '#d0d0d0'
    var step = 50
    if (gridOn) {
        for (var i = 1; i < cw/step; i++) {
            var gridLine = document.createElement('div')
            gridLine.classList.add('grid-line')
            gridLine.style.height = ch + 'px'
            gridLine.style.width = 0
            gridLine.style.borderLeftColor = gridColor
            gridLine.style.borderLeftStyle = 'solid'
            gridLine.style.borderLeftWidth = '1px'
            gridLine.style.position = 'absolute'
            gridLine.style.left = (i * step) + 'px'
            gridLine.style.top = 0
            canvas.append(gridLine)
        }
        for (var i = 1; i < ch/step; i++) {
            var gridLine = document.createElement('div')
            gridLine.classList.add('grid-line')
            gridLine.style.height = 0
            gridLine.style.width = cw + 'px'
            gridLine.style.borderTopColor = gridColor
            gridLine.style.borderTopStyle = 'solid'
            gridLine.style.borderTopWidth = '1px'
            gridLine.style.position = 'absolute'
            gridLine.style.left = 0
            gridLine.style.top = (i * step) + 'px'
            canvas.append(gridLine)
        }
    }
}

function toggleGridLabels(labelsOn) {
    var gridLabels = document.getElementsByClassName('grid-label')
    Array.from(gridLabels).forEach(gl => gl.parentNode.removeChild(gl))
    
    var labelColor = '#d0d0d0'
    var step = 50
    if (labelsOn) {
        for (var i = 0; i < cw/step; i++) {
            var gridLabel = document.createElement('div')
            gridLabel.classList.add('grid-label')
            gridLabel.style.color = labelColor
            gridLabel.style.fontSize = '8pt'
            gridLabel.innerHTML = (i * step)
            gridLabel.style.position = 'absolute'
            gridLabel.style.left = (i * step + 2) + 'px'
            gridLabel.style.top = 0
            if (i == 0)
            gridLabel.style.top = '2px'
            canvas.append(gridLabel)
        }
        for (var i = 1; i < ch/step; i++) {
            var gridLabel = document.createElement('div')
            gridLabel.classList.add('grid-label')
            gridLabel.style.color = labelColor
            gridLabel.style.fontSize = '8pt'
            gridLabel.innerHTML = (i * step)
            gridLabel.style.position = 'absolute'
            gridLabel.style.left = 0
            gridLabel.style.top = (i * step + 2) + 'px'
            canvas.append(gridLabel)
        }
    }
}


/**
 * TODO
 * 
 * Shows or hides the grid on the canvas
 * 
 * @param {*} gridOn 
 */
function toggleGridDepr(gridOn) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, cw, ch)

    if (gridOn) {
        var step = 50
        let nX = Math.floor(cw / step) - 2
        let nY = Math.floor(ch / step) - 2
        let pX = cw - nX * step
        let pY = ch - nY * step
        let pL = Math.ceil(pX / 2) - 0.5
        let pT = Math.ceil(pY / 2) - 0.5
        let pR = cw - nX * step - pL
        let pB = ch - nY * step - pT

        ctx.lineWidth = 1
        ctx.strokestyle = '#dddddd'
        //ctx.translate(0.5, 0.5)
        ctx.scale(0.5,0.5)
        for (var i = 0; i <= cw*2; i += step) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i, ch)
        }
        for (var i = 0; i <= ch*2; i += step) {
            ctx.moveTo(0, i)
            ctx.lineTo(cw, i)
        }
        ctx.stroke()
    }
}