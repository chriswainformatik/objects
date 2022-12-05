var editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
});
editor.on('change', function() {
    //console.log(editor.getValue())
})

document.getElementsByClassName('CodeMirror')[0].classList.add('border')

/*
document.getElementById('check-show-grid').addEventListener('change', function() {
    if (this.checked)
        toggleGrid(true)
    else
        toggleGrid(false)
})
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

function runCode() {
    // remove error line marking
    Array.from(document.getElementsByClassName('error-line')).forEach((el) => {
        el.classList.remove('error-line')
    });
    
    parseCode()


}

function parseCode() {
    var lines = editor.getValue().split('\n')
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        line.replace(' ', '')
        try {
            var tokens = getTokensFrom(i, line)
        } catch (error) {
            var output = 'Error in line ' + i + ':\n' + error.lineText + '\n'
            var indicator = ''
            for (var j = 0; j < error.charNumber; j++) {
                indicator += ' '
            }
            indicator += '^'
            output += indicator
            console.log(output)
            editor.addLineClass(error.lineNumber, "background", "error-line");
            //editor.markText({line:i,ch:error.charNumber},{line:i,ch:error.charNumber+1},{css: 'background-color: #ff0000'})
        }
    }
}

/**
 * Reads a line character by character and returns all the tokens found in that line.
 * 
 * Tokens can be: instance name, class name, method call, seperators '.' or ':' (tokens are not validated here)
 * 
 * @param {int} lineNumber number of line to be read
 * @param {string} line line to be read
 * @returns an array of tokens found in that line
 * @throws Error when an invalid character is read
 */
function getTokensFrom(lineNumber, line) {
    line = line.toString()
    var state = 1
    var tokens = []
    var seperatorIndex = -1
    if (!line[0].match('[a-zA-Z]')) {
        invalidInputCharacterError(lineNumber, line, 0)
    }
    for (var i = 1; i < line.length; i++) {
        switch(state) {
            case 1:
                if (line[i].match('[a-zA-Z0-9]')) {
                    state = 1
                } else if (line[i] == '.' || line[i] == ':') {
                    tokens.push(new InstanceName(line.substring(0, i)))
                    tokens.push(new Seperator(line[i]))
                    seperatorIndex = i
                    state = line[i] == '.' ? 2 : 8
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
            case 2:
                if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                    state = 3
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
            case 3:
                if (line[i].match('[a-zäöüßA-ZÄÖÜ0-9]')) {
                    state = 3
                } else if (line[i] == '(') {
                    state = 4
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
            case 4:
                if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                    // string input for colors
                    state = 5
                } else if (line[i].match('[0-9]')) {
                    // numeric input
                    state = 6
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
            case 5:
                if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                    state = 5
                } else if (line[i] == ')') {
                    tokens.push(line.substring(seperatorIndex+1, line.length))
                    state = 7
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
            case 6:
                if (line[i].match('[0-9]')) {
                    state = 6
                } else if (line[i] == ')') {
                    state = 7
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
            case 7:
                // there must be characters after ')'
                invalidInputCharacterError(lineNumber, line, i)
            case 8:
                if (line[i].match('[A-ZÄÖÜ]')) {
                    state = 8
                } else {
                    invalidInputCharacterError(lineNumber, line, i)
                }
                break;
        }
    }
    if (state == 7) {
        var fullMethodCall = line.substring(seperatorIndex+1, line.length)
        var methodName = fullMethodCall.split('(')[0]
        var methodValue = fullMethodCall.split('(')[1].split(')')[0]
        tokens.push(new MethodCall(methodName, methodValue))
    } else if (state == 8) {
        tokens.push(new ClassName(line.substring(seperatorIndex+1, line.length)))
    }

    return tokens
}

function invalidInputCharacterError(lineNumber, line, charNumber) {
    throw new InvalidInputCharacterError(lineNumber, line, charNumber)
}

class InvalidInputCharacterError extends Error {
    constructor(lineNumber, lineText, charNumber) {
        super('Invalid input character: ' + lineText + ' (character ' + charNumber + ')')
        this.lineNumber = lineNumber
        this.lineText = lineText
        this.charNumber = charNumber
    }
}

class Token {
    constructor (name) {
        this.name = name   
    }
    getName() {
        return this.name
    }
}

class InstanceName extends Token {
    constructor (name) {
        super(name)
    }
}

class ClassName extends Token {
    constructor (name) {
        super(name)
    }
}

class MethodCall extends Token {
    constructor (name, value) {
        super(name)
        this.value = value
    }
}

class Seperator extends Token {
    constructor (name) {
        super(name)
    }
}