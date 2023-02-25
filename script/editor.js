/*
 * Objects Language Definition
 */
CodeMirror.defineSimpleMode("objectslang", {
    start: [
        { regex: /[a-zA-Z][a-zA-Z0-9]*/, token: "identifier", next: "seperator"}
    ],
    seperator: [
        { regex: /:/, token: "seperator", next: "instancecreation" },
        { regex: /./, token: "seperator", next: "methodcall" }
    ],
    instancecreation: [
        { regex: /[A-Z]*/, token: "classname", next: "start" }
    ],
    methodcall: [
        { regex: /[a-zäöüA-ZÄÖÜ][a-zäöüßA-ZÄÖÜ0-9]*/, token: "methodcall", next: "paranthesis" } 
    ],
    paranthesis: [
        { regex: /\(/, next: "param" },
        { regex: /\)/, next: "start" }
    ],
    param: [
        { regex: /[0-9]+/, token: "number", next: "paramseperator" },
        { regex: /("[a-zäöüA-ZÄÖÜ][a-zäöüßA-ZÄÖÜ0-9]*"|[a-zäöü?A-ZÄÖÜ][a-zäöüßA-ZÄÖÜ0-9]*)/ , token: "string", next: "paramseperator" }
    ],
    paramseperator: [
        { regex: /,/, next: "param" },
        { regex: /\)/, next: "start" }
    ]
})


var runner = undefined

var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true,
    mode: "objectslang"
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

    // autocompletion options
    document.getElementById('check-enable-autocomplete').addEventListener('change', (e) => toggleAutocompletion(e.target.checked))
}, false)


function toggleAutocompletion(enabled) {
    if (enabled) {
        editor.addKeyMap({ 'Ctrl-Space' : 'autocomplete' })
    } else {
        editor.removeKeyMap('Ctrl-Space')
    }
}

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
    /**
     * Helper function to draw or stroke polygon shapes.
     * 
     * @param {*} context context to draw on
     * @param {*} points points of the polygon
     * @param {*} type 'fill' or 'stroke'
     */
    function drawShape(context, points, type) {
        context.beginPath()
        context.moveTo(points[0][0], points[0][1])
        for (var i = 1; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1])
        }
        context.closePath()
        if (type == 'fill') {
            context.fill()
        } else if (type == 'stroke') {
            context.stroke()
        }
    }

    var element = document.getElementById(shape.instanceName)
    element.style.top = (shape.y - shape.h) + 'px'
    element.style.left = shape.x + 'px'
    element.width = shape.w
    element.height = shape.h
    var context = element.getContext('2d')
    context.clearRect(0, 0, element.width, element.height)
    context.fillStyle = shape.fillColor
    context.strokeStyle = shape.lineColor
    context.lineWidth = shape.lineWidth
    context.lineJoin = 'milter'
    if (shape.type == 'triangle') {
        // define points
        var points = [
            [0, shape.h],
            [shape.w, shape.h],
            [shape.w/2, 0],
            [0, shape.h]
        ]
        // fill the area of the triangle
        drawShape(context, points, 'fill')

        // this is a "don't touch - it works" code fragment
        context.globalCompositeOperation = 'source-over'
        drawShape(context, points, 'stroke')
        context.globalCompositeOperation = 'destination-in'
        drawShape(context, points, 'fill')
        // "dont't touch - it works" end
    } else if (shape.type == 'circle') {
        element.style.top = (shape.y - shape.w/2) + 'px'
        element.style.left = (shape.x - shape.w/2) + 'px'
        context.beginPath()
        context.arc(shape.w/2, shape.h/2, shape.w/2, 0, 2 * Math.PI, false)
        context.fill()
        context.lineWidth = context.lineWidth/2
        context.beginPath()
        context.arc(shape.w/2, shape.h/2, shape.w/2 - context.lineWidth/2.0, 0, 2 * Math.PI, false)
        context.stroke()
    } else if (shape.type == 'rectangle') {
        console.log(shape)
        context.fillRect(0, 0, shape.w, shape.h)
        context.strokeRect(0, 0, shape.w, shape.h)
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