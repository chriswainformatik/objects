class CodeRunner {
    stepDelay = 0.5

    classesList = []
    methodsCaseSensitive = false

    instancesList = []

    lines = []

    // shapes as objects that are drawn
    shapesList = []


    constructor(classesList) {
        this.classesList = classesList
    }

    setLines(ll) {
        this.lines = ll
    }

    setStepDelay(delay) {
        this.stepDelay = delay
    }

    clearObjects() {
        this.instancesList = []
        globalInstancesList = this.instancesList
        this.shapesList = []
    }

    /**
     * Does the following line by line:
     *  1. Check syntax
     *  2. Check semantics
     * Stops if an error is found at step 1 or step 2 and marks the corresponding line.
     * 
     * If there are no errors, executes the commands, line by line.
     * 
     * @param {function} syntaxError callback function if a syntax error occurs
     * @param {function} semanticError callback function if a semantic error occurs
     * @param {function} setActiveLine callback function to mark the active line
     * @param {function} updateDOMObject callback function to update a DOM object
     */
    runCode(syntaxError, semanticError, setActiveLine, updateDOMObject) {
        for (var i = 0; i < this.lines.length; i++) {
            var line = this.lines[i].toString()
            // 1. check syntax
            try {
                //this.linesAsTokensList.push(this.getTokensFromLine(i, line))
                this.checkSyntax(i, line)
            } catch (error) {
                var output = 'Error in line ' + (i+1) + ':\n' + error.lineText + '\n'
                var indicator = ''
                for (var j = 0; j < error.charNumber; j++) {
                    indicator += ' '
                }
                indicator += '^'
                output += indicator
                console.log(output)

                syntaxError(i)

                return -1
            }


            // 2. check semantics
            try {
                this.checkSemantics(i, line)
            } catch (error) {
                console.log(error)
                semanticError(i, error)
                return -1
            }

        }

        // 3. execute commands
        i = 0
        this.runLine(i, updateDOMObject)
        i++
        var steps = setInterval(() => {
            this.runLine(i, updateDOMObject)
            i++
            if (i == this.lines.length) {
                clearInterval(steps)
                setTimeout(function() {
                    setActiveLine(-1)
                }, this.stepDelay*1000)
            }
        }, this.stepDelay*1000)
    }

    runLine(lineNumber, updateDOMObject) {
        setActiveLine(lineNumber)
        if (this.lines[lineNumber] === undefined)
            return
        var line = this.lines[lineNumber].toString()
        line = line.replaceAll(' ', '')
        if (line.includes(':')) {
            // create elements
            var instanceName = line.split(':')[0]
            var className = line.split(':')[1]
            var shape = undefined
            switch (className) {
                case 'KREIS':
                    shape = new KREIS(instanceName)
                    break;
                case 'RECHTECK':
                    shape = new RECHTECK(instanceName)
                    break;
                case 'DREIECK':
                    shape = new DREIECK(instanceName)
                    break;
                default:
                    console.error('An error occured while running the code (after checking syntax and semantics)')
            }
            
            var shapeCanvas = document.createElement('canvas')
            shapeCanvas.id = shape.instanceName
            shapeCanvas.classList.add('shape-canvas')
            shapeCanvas.classList.add('graphical-object')
            shapeCanvas.width = shape.w
            shapeCanvas.height = shape.h
            shapeCanvas.style.left = shape.x
            shapeCanvas.style.top = shape.y
            if (shape.type == 'rectangle' || shape.type == 'triangle') {
                shapeCanvas.style.top = shape.y - shape.h
            }
            document.getElementById('the-canvas').appendChild(shapeCanvas)
            updateDOMObject(shape)

            this.shapesList.push(shape)
        } else if (line.includes('.')) {
            // call methods
            var theInstance = this.instancesList.find(inst => inst.name ==  line.split('.')[0])
            var methodName = line.split('.')[1].split('(')[0]
            var methodArguments = line.split('(')[1].substring(0, line.split('(')[1].length-1).split(',')
            methodArguments.forEach((arg, i) => {
                methodArguments[i] = arg.replaceAll(' ', '')
                methodArguments[i] = arg.replaceAll('"', '')
            })

            // TODO: case sensitive methods
            // call the method on the shape object
            var theShape = this.shapesList.find(inst => inst.instanceName == theInstance.name)
            theShape[methodName.toLowerCase()].apply(theShape,methodArguments)
            // notify DOM object
            updateDOMObject(theShape)
        } else if (line == '') {
            // skip empty line
        } else {
            console.error('An error occured while running the code (after checking syntax and semantics)')
        }
    }

    checkSemantics(lineNumber, line) {
        line = line.toString()
        line = line.replaceAll(' ', '')
        var tokens = []
        if (line.includes(':')) {
            tokens = line.split(':')
            var instanceName = tokens[0]
            var className = tokens[1]
            if (this.classesList.find(cls => cls.name == className) == undefined) {
                throw new NoSuchClassError(lineNumber, className)
            }
            if (this.instancesList.find(inst => inst.name == instanceName) == undefined) {
                var newInstance = {
                    name: instanceName,
                    class: className,
                }
                this.instancesList.push(newInstance)
                globalInstancesList.push(newInstance)
            } else {
                // object has already been defined
                throw new DuplicateInstanceError(lineNumber, instanceName)
            }
        } else if (line.includes('.')) {
            tokens = line.split('.')
            var instanceName = tokens[0]
            var method = tokens[1]
            var methodName = method.split('(')[0]
            var methodArguments = method.substring(0, method.length - 1).split('(')[1].split(',')
            methodArguments.forEach((arg, i) => {
                methodArguments[i] = arg.replaceAll(' ', '')
                methodArguments[i] = arg.replaceAll('"', '')
            })

            var theClass = undefined
            // check if instance exists
            if (this.instancesList.find(inst => inst.name == instanceName) == undefined) 
                throw new NoSuchInstanceError(lineNumber, instanceName)
            
            var className = this.instancesList.find(inst => inst.name == instanceName).class
            theClass = this.classesList.find(cls => cls.name == className)
            // check if instance knows method
            var theMethod = undefined
            if (this.methodsCaseSensitive) {
                if (theClass.methods.find(m => m.name == methodName) == undefined) 
                    throw new NoSuchMethodError(lineNumber, methodName)
                
                theMethod = theClass.methods.find(m => m.name == methodName)
            } else {
                if (theClass.methods.find(m => m.name.toLowerCase() == methodName.toLowerCase()) == undefined) 
                    throw new NoSuchMethodError(lineNumber, methodName)
                
                theMethod = theClass.methods.find(m => m.name.toLowerCase() == methodName.toLowerCase())
            }
            // check if parameters list is correct
            if (methodArguments.length != theMethod.parameters.length) {
                throw new WrongArgumentCountError(lineNumber, methodName)
            }
            for (var i = 0; i < methodArguments.length; i++) {
                if (theMethod.parameters[i] == 'number') {
                    // check if argument is a number
                    if (isNaN(Number.parseInt(methodArguments[i]))) 
                        throw new MyIllegalArgumentError(lineNumber, methodName, methodArguments[i], theMethod.parameters[i])
                    
                } else if (theMethod.parameters[i] == 'string') {
                    // check if string is allowed value
                    if (globalAllowedValues.find(v => v == methodArguments[i]) == undefined)
                        throw new MyIllegalArgumentError(lineNumber, methodName, methodArguments[i])
                }
            }
        }
        
        return true
    }

    createInstance(instanceName, className) {
        if (this.classesList.find(cls => cls.name == className) == undefined) {
            throw new NoSuchClassError(i, line[2].name)
        } else {
            switch (className) {
                case 'KREIS':
                    return new KREIS(instanceName)
                case 'RECHTECK':
                    return new RECHTECK(instanceName)
                case 'DREIECK':
                    return new DREIECK(instanceName)
            }
        }
    }

    /**
     * Reads a line character by character and veryfies the syntax using an automata.
     * 
     * 
     * @param {int} lineNumber number of line to be read
     * @param {string} line line to be read
     * @throws Error when an invalid character is read
     */
    checkSyntax(lineNumber, line) {
        line = line.toString()
        if (line == '')
            return
        line = line.replaceAll(' ', '')
        var state = 1
        var seperatorIndex = -1
        if (!line[0].match('[a-zA-Z]')) {
            this.invalidInputCharacterError(lineNumber, line, 0)
        }
        var quoteOpen = false
        for (var i = 1; i < line.length; i++) {
            switch(state) {
                case 1:
                    if (line[i].match('[a-zA-Z0-9]')) {
                        state = 1
                    } else if (line[i] == '.' || line[i] == ':') {
                        seperatorIndex = i
                        state = line[i] == '.' ? 2 : 8
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 2:
                    if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                        state = 3
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 3:
                    if (line[i].match('[a-zäöüßA-ZÄÖÜ0-9]')) {
                        state = 3
                    } else if (line[i] == '(') {
                        state = 4
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 4:
                    if (line[i] == '"') {
                        state = 41
                        quoteOpen = true
                    } else if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                        // string input for colors
                        state = 5
                    } else if (line[i].match('[0-9]')) {
                        // numeric input
                        state = 6
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 41:
                    if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                        // string input for colors
                        state = 5
                    } else {
                        // numeric input only without quotes
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 5:
                    if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                        state = 5
                    } else if (line[i] == ',' && !quoteOpen) {
                        state = 4
                    } else if (line[i] == ')' && !quoteOpen) {
                        //tokens.push(line.substring(seperatorIndex+1, line.length))
                        state = 7
                    } else if (line[i] == '"' && quoteOpen) {
                        quoteOpen = false
                        state = 51
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 51:
                    if (line[i] == ',') {
                        state = 4
                    } else if (line[i] == ')' && !quoteOpen) {
                        state = 7
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                case 6:
                    if (line[i].match('[0-9]')) {
                        state = 6
                    } else if (line[i] == ',' && !quoteOpen) {
                        state = 4
                    } else if (line[i] == ')' && !quoteOpen) {
                        state = 7
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 61:
                    if (line[i] == ',') {
                        state = 4
                    } else if (line[i] == ')') {
                        state = 7
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 7:
                    // there must be characters after ')'
                    this.invalidInputCharacterError(lineNumber, line, i)
                case 8:
                    if (line[i].match('[A-ZÄÖÜ]')) {
                        state = 8
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
            }
        }

        if (state != 7 && state != 8) {
            // something went wrong
            return false
        }

        return true
    }

    invalidInputCharacterError(lineNumber, line, charNumber) {
        throw new InvalidInputCharacterError(lineNumber, line, charNumber)
    }
    
}

class Token {
    constructor (name) {
        this.name = name   
    }
    getName() {
        return this.name
    }
    equals(other) {
        return this.name == other.name
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