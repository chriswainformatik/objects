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


/**
 * Create the CodeMirror instance.
 */
var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true,
    mode: "objectslang"
});
document.getElementsByClassName('CodeMirror')[0].classList.add('border')


var runner = undefined
var popovers = []


/**
 * Do a few things on startup.
 */
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


/**
 * Enables or disables autocompletion, depending on the parameter value.
 * 
 * @param {boolean} enabled 
 */
function toggleAutocompletion(enabled) {
    if (enabled) {
        editor.addKeyMap({ 'Ctrl-Space' : 'autocomplete' })
    } else {
        editor.removeKeyMap('Ctrl-Space')
    }
}

/**
 * Clears all elements and re-runs the whole code.
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
        try {
            p.dispose()
        } catch (error) {
            console.log(error)
        }
    })
    popovers = []
    clearLineBackgrounds()
    runner.setLines(editor.getValue().split('\n'))
    runner.runCode(setSyntaxError, setSemanticError, setActiveLine, updateDOMObject)
}

/**
 * Updates the DOM object representing a shape.
 * Every shape is represented by a canvas object on which the shape is drawn.
 * This method re-draws the shape on the canvas using all updated attribute values.
 * 
 * @param {SHAPE} shape The shape which the DOM object is representing
 */
function updateDOMObject(shape) {
    /**
     * Helper function to draw or stroke polygon shapes.
     * 
     * @param {*} context context to draw on
     * @param {*} points points of the polygon
     * @param {String} type 'fill' or 'stroke'
     * @param {String} lineStyle 'solid' (default), 'dashed' or 'dotted'
     */
    function drawShape(context, points, type, lineStyle='solid') {
        context.beginPath()
        context.moveTo(points[0][0], points[0][1])
        for (var i = 1; i < points.length; i++) {
            context.lineTo(points[i][0], points[i][1])
        }
        context.closePath()
        if (type == 'fill') {
            context.fill()
        } else if (type == 'stroke') {
            context.setLineDash(getLineDash(lineStyle))
            context.stroke()
        }
    }

    function getLineDash(lineStyle) {
        if (lineStyle == 'solid') {
            return []
        } else if (lineStyle == 'dashed') {
            return [2*context.lineWidth, 2*context.lineWidth]
        } else if (lineStyle == 'dotted') {
            return [0.5*context.lineWidth, context.lineWidth]
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
        drawShape(context, points, 'stroke', shape.lineStyle)
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
        context.setLineDash(getLineDash(shape.lineStyle))
        context.stroke()
    } else if (shape.type == 'rectangle') {
        console.log(shape)
        context.fillRect(0, 0, shape.w, shape.h)
        context.setLineDash(getLineDash(shape.lineStyle))
        context.strokeRect(0, 0, shape.w, shape.h)
    }
}

/**
 * Removes the background styles for each line in the editor.
 */
function clearLineBackgrounds() {
    for (var i = 0; i < editor.lineCount(); i++) {
        editor.removeLineClass(i, "background")
    }
}

/**
 * Marks the given line as active.
 * 
 * @param {number} lineNumber The number of the line that will be marked as active.
 */
function setActiveLine(lineNumber) {
    // remove active line marking
    clearLineBackgrounds()
    if (lineNumber >= 0)
        editor.addLineClass(lineNumber, "background", "active-line")
}

/**
 * Displays a syntax error popover for the given line.
 * 
 * @param {number} errorLine The number of the line where the syntax error occured.
 */
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

/**
 * Displays a semantics error popover for the given line.
 * 
 * @param {number} errorLine The number of the line where the semantics error occured.
 * @param {string} error The text of the error that explains the semantics error to the user.
 */
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