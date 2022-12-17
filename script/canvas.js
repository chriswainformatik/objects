var canvas = undefined
var cw = -1
var ch = -1

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('the-canvas')

    cw = canvas.clientWidth
    //canvas.setAttribute('width', cw)
    canvas.style.width = cw + 'px'
    //var ch = cw*0.6
    ch = 350
    //canvas.setAttribute('height', ch)
    canvas.style.height = ch + 'px'

    // set the editor height at this point because this script file gets loaded after the editor.js
    editor.setSize(cw, ch)

}, false);

//canvas.style.backgroundImage = "url('data:image/svg+xml,<svg width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><defs><pattern id=\"grid\" width=\"25\" height=\"25\" patternUnits=\"userSpaceOnUse\"><path d=\"M 25 0 L 0 0 0 25\" fill=\"none\" stroke=\"gray\" stroke-width=\"1\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\" /></svg>')"

function toggleGrid(gridOn) {
    var gridLines = document.getElementsByClassName('grid-line')
    Array.from(gridLines).forEach(gl => gl.parentNode.removeChild(gl))

    var step = 50
    if (gridOn) {
        for (var i = 0; i < cw/step; i++) {
            var gridLine = document.createElement('div')
            gridLine.classList.add('grid-line')
            gridLine.style.height = ch + 'px'
            gridLine.style.width = 0
            gridLine.style.borderColor = '#a0a0a0'
            gridLine.style.borderStyle = 'solid'
            gridLine.style.position = 'relative'
            gridLine.style.left = (i * step) + 'px'
            gridLine.style.top = 0
            canvas.append(gridLine)
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