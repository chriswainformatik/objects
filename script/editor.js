var runner = undefined

var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
});
editor.on('change', function() {
    //console.log(editor.getValue())
})
document.getElementsByClassName('CodeMirror')[0].classList.add('border')

var popovers = []

document.addEventListener('DOMContentLoaded', function () {
    runner = new CodeRunner(globalClassesList)
    document.getElementById('btn-run-code').addEventListener('click', runCode)
    // enable popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    // velocity control
    document.getElementById('velocity').addEventListener('change', function(event) {
        runner.setStepDelay(2 - event.target.value)
    })
}, false)


/*
document.getElementById('check-show-grid').addEventListener('change', function() {
    if (this.checked)
        toggleGrid(true)
    else
        toggleGrid(false)
})
*/


function runCode() {
    // remove elements
    //document.getElementById('the-canvas').replaceChildren()
    Array.from(document.getElementById('the-canvas').childNodes).forEach(c => {
        if(c.classList.contains('graphical-object')) {
            c.remove()
        }
    })
    runner.clearObjects()
    // remove error marking
    popovers.forEach(p => {
        p.dispose()
    })
    popovers = []
    clearLineBackgrounds()
    runner.setLines(editor.getValue().split('\n'))
    runner.runCode(setSyntaxError, setSemanticError, setActiveLine, updateDOMObject)
}

function updateDOMObject(shape) {
    var element = document.getElementById(shape.instanceName)
    if (shape.constructor.name == 'DREIECK') {
        // triangle is a bit more complicated
        var elementWrapper = element
        element = elementWrapper.firstChild
        
        elementWrapper.style.top = (shape.y - shape.baseLength) + 'px'
        elementWrapper.style.left = shape.x + 'px'
        elementWrapper.style.width = shape.baseLength + 'px'
        elementWrapper.style.height = shape.baseLength + 'px'

        elementWrapper.style.borderBottomStyle = shape.lineStyle
        elementWrapper.style.borderBottomColor = shape.lineColor
        elementWrapper.style.borderBottomWidth = shape.lineWidth + 'px'
        // make the corners sharp
        elementWrapper.style.borderLeftStyle = 'solid'
        elementWrapper.style.borderLeftColor = 'transparent'
        elementWrapper.style.borderLeftWidth = shape.lineWidth + 'px'
        elementWrapper.style.borderRightStyle = 'solid'
        elementWrapper.style.borderRightColor = 'transparent'
        elementWrapper.style.borderRightWidth = shape.lineWidth + 'px'

        elementWrapper.style.overflow = 'hidden'
        elementWrapper.style.transformOrigin = '0 ' + shape.baseLength + 'px'

        var scaleX = shape.w / shape.baseLength
        var scaleY = shape.h / shape.baseLength
        elementWrapper.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')'
        
        element.id = shape.instanceName + '-inner'
        var diagonalLength = ( Math.floor(Math.sqrt( Math.pow(shape.baseLength-shape.lineWidth,2) / 2 )) ) + 'px'
        element.style.width = diagonalLength
        element.style.height = diagonalLength
        element.style.transform = 'translateX(' + (shape.baseLength/2-shape.lineWidth) + 'px) translateY(' + (shape.baseLength/2) + 'px) rotate(45deg)'
        element.style.transformOrigin = '0 0'

        element.style.backgroundColor = shape.fillColor
        element.style.borderStyle = shape.lineStyle
        element.style.borderColor = shape.lineColor
        element.style.borderWidth = shape.lineWidth + 'px'
    } else {
        element.style.top = shape.y + 'px'
        element.style.left = shape.x + 'px'
        element.style.width = shape.w + 'px'
        element.style.height = shape.h + 'px'
        element.style.backgroundColor = shape.fillColor
        element.style.borderStyle = shape.lineStyle
        element.style.borderColor = shape.lineColor
        element.style.borderWidth = shape.lineWidth + 'px'
        if (shape.constructor.name == 'KREIS')
            element.style.borderRadius = shape.h/2 + 'px'
        
    }
}

function clearLineBackgrounds() {
    for (var i = 0; i < editor.lineCount(); i++) {
        editor.removeLineClass(i, "background")
    }
}

function setActiveLine(lineNumber) {
    // remove active line marking
    clearLineBackgrounds()
    if (lineNumber >= 0)
        editor.addLineClass(lineNumber, "background", "active-line")
}

function setSyntaxError(errorLine) {
    editor.addLineClass(errorLine, "background", "error-line")
    console.log('Syntax error')

    // add popover
    var popover = new bootstrap.Popover(document.getElementsByClassName('error-line')[0], {
        'html': true,
        'content': '<p>Fehler in dieser Zeile!<br>Hast du dich vertippt?</p><div class="text-center"><small><i>Anklicken zum Schließen</i></small></div>',
        'placement': 'bottom'
    })
    popover.show()
    popovers.push(popover)
    document.getElementsByClassName('popover')[0].addEventListener('click', () => {
        popover.dispose()
    })
    
}

function setSemanticError(errorLine, error) {
    editor.addLineClass(errorLine, "background", "error-line")
    console.log('Semantics error')

    // add popover
    var popover = new bootstrap.Popover(document.getElementsByClassName('error-line')[0], {
        'html': true,
        'content': '<p>' + error.germanText +'<br>Hast du dich vertippt?</p><div class="text-center"><small><i>Anklicken zum Schließen</i></small></div>',
        'placement': 'bottom'
    })
    popover.show()
    popovers.push(popover)
    document.getElementsByClassName('popover')[0].addEventListener('click', () => {
        popover.dispose()
    })
}


/**
 * DEPRECATED
 */
function addEditorPanel() {
    var panel = document.createElement('div')
    panel.id = 'editor-top-panel'
    panel.classList.add('row')
    panel.classList.add('my-2')

    var btnWrapper = document.createElement('div')
    btnWrapper.classList.add('col-md-auto')
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.classList.add('btn')
    btn.classList.add('btn-success')
    btn.classList.add('btn-sm')
    btn.innerHTML = '<span class="bi bi-caret-right-fill"></span> Ausführen '    
    btn.addEventListener('click', runCode)
    btnWrapper.appendChild(btn)
    panel.appendChild(btnWrapper)

    var silderWrapper = document.createElement('div')
    silderWrapper.classList.add('col')
    silderWrapper.classList.add('row')

    var sliderLabel = document.createElement('div')
    sliderLabel.classList.add('col-md-auto')
    sliderLabel.innerHTML = '<label for="veloxity" class="form-label my-auto">Geschwindigkeit</label>'
    silderWrapper.appendChild(sliderLabel)

    var slider = document.createElement('div')
    slider.classList.add('col')
    slider.innerHTML = '<input type="range" class="form-range" min="0" max="5" step="0.5" id="velocity">'
    silderWrapper.appendChild(slider)
    
    panel.appendChild(silderWrapper)

    editor.addPanel(panel)
}