document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('the-canvas')

    var cw = canvas.clientWidth
    canvas.setAttribute('width', cw)
    //var ch = cw*0.6
    var ch = 350
    canvas.setAttribute('height', ch)

    // set the editor height at this point because this script file gets loaded after the editor.js
    editor.setSize(cw, ch)

}, false);

//canvas.style.backgroundImage = "url('data:image/svg+xml,<svg width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><defs><pattern id=\"grid\" width=\"25\" height=\"25\" patternUnits=\"userSpaceOnUse\"><path d=\"M 25 0 L 0 0 0 25\" fill=\"none\" stroke=\"gray\" stroke-width=\"1\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\" /></svg>')"

/**
 * TODO
 * 
 * Shows or hides the grid on the canvas
 * 
 * @param {*} gridOn 
 */
function toggleGrid(gridOn) {
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