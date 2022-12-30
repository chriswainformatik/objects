var runner = undefined

var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
});
editor.on('change', function() {
    //console.log(editor.getValue())
})
document.getElementsByClassName('CodeMirror')[0].classList.add('border')


document.addEventListener('DOMContentLoaded', function () {
    runner = new CodeRunner(globalClassesList)
    document.getElementById('btn-run-code').addEventListener('click', runCode)
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
    // remove error line marking
    Array.from(document.getElementsByClassName('error-line')).forEach((el) => {
        el.classList.remove('error-line')
    });
    runner.setLines(editor.getValue().split('\n'))
    runner.runCode(setSyntaxError, setSemanticError)
}

function setSyntaxError(errorLine) {
    editor.addLineClass(errorLine, "background", "error-line")
    console.log('Syntax error')
}

function setSemanticError(errorLine) {
    editor.addLineClass(errorLine, "background", "error-line")
    console.log('Semantics error')
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