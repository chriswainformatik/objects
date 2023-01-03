class CodeRunner {
    classesList = []
    methodsCaseSensitive = false

    instancesList = []

    lines = []

    // shapes as DOM elements that are drawn
    DOMinstancesList = []


    constructor(classesList) {
        this.classesList = classesList
    }

    setLines(ll) {
        this.lines = ll
    }


    /**
     * Does the following line by line:
     *  1. Check syntax
     *  2. Check semantics
     * Stops if an error is found at step 1 or step 2 and marks the corresponding line.
     * 
     * If there are no errors, executes the commands, line by line.
     * 
     * @param {*} syntaxError callback function if a syntax error occurs
     * @param {*} semanticError callback function if a semantic error occurs
     */
    runCode(syntaxError, semanticError) {
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
        this.lines.forEach(line => {
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
                document.getElementById('the-canvas').appendChild(shape.create())
                this.DOMinstancesList.push(shape)
                //console.log(shape.create())
            } else if (line.includes('.')) {
                // call methods
            } else if (line == '') {
                // skip empty line
            } else {
                console.error('An error occured while running the code (after checking syntax and semantics)')
            }
        })
    }



    checkSemantics(lineNumber, line) {
        line = line.toString()
        var tokens = []
        if (line.includes(':')) {
            tokens = line.split(':')
            var instanceName = tokens[0]
            var className = tokens[1]
            if (this.classesList.find(cls => cls.name == className) == undefined) {
                throw new NoSuchClassError(lineNumber, className)
            }
            if (this.instancesList.find(inst => inst.name == instanceName) == undefined) {
                this.instancesList.push({
                    name: instanceName,
                    class: className,
                })
            }
        } else if (line.includes('.')) {
            tokens = line.split('.')
            var instanceName = tokens[0]
            var method = tokens[1]
            var methodName = method.split('(')[0]
            var methodArguments = method.substring(0, method.length - 1).split('(')[1].split(',')
            methodArguments.forEach((arg, i) => {
                methodArguments[i] = arg.replace(' ', '')
            })

            var theClass = undefined
            // check if instance exists
            if (this.instancesList.find(inst => inst.name == instanceName) == undefined) {
                throw new NoSuchInstanceError(lineNumber, instanceName)
            } else {
                var className = this.instancesList.find(inst => inst.name == instanceName).class
                theClass = this.classesList.find(cls => cls.name == className)
            }
            // check if instance knows method
            if (this.methodsCaseSensitive) {
                if (theClass.methods.find(m => m == methodName) == undefined) {
                    throw new NoSuchMethodError(lineNumber, methodName)
                }
            } else {
                if (theClass.methods.find(m => m.toLowerCase() == methodName.toLowerCase()) == undefined) {
                    throw new NoSuchMethodError(lineNumber, methodName)
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
        var state = 1
        var seperatorIndex = -1
        if (!line[0].match('[a-zA-Z]')) {
            this.invalidInputCharacterError(lineNumber, line, 0)
        }
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
                    if (line[i] == ' ') {
                        state = 4
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
                case 5:
                    if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
                        state = 5
                    } else if (line[i] == ',') {
                        state = 4
                    } else if (line[i] == ')') {
                        //tokens.push(line.substring(seperatorIndex+1, line.length))
                        state = 7
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 6:
                    if (line[i].match('[0-9]')) {
                        state = 6
                    } else if (line[i] == ',') {
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

        if (state != 7 || state != 8) {
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