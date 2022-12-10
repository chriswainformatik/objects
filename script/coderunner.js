class CodeRunner {
    lines = []
    tokensList = []

    constructor() {
    }

    setLines(ll) {
        this.lines = ll
    }

    /**
     * Checks the syntax and returns the line number of the error line.
     * Adds all the tokens to the tokensList.
     * 
     * @returns The line number of the error line or -1 if there is no syntax error.
     */
    checkSyntax() {
        for (var i = 0; i < this.lines.length; i++) {
            var line = this.lines[i]
            line.replace(' ', '')
            try {
                this.tokensList = this.getTokensFrom(i, line)
            } catch (error) {
                var output = 'Error in line ' + i + ':\n' + error.lineText + '\n'
                var indicator = ''
                for (var j = 0; j < error.charNumber; j++) {
                    indicator += ' '
                }
                indicator += '^'
                output += indicator
                console.log(output)
                return error.lineNumber
                //this.editor.addLineClass(error.lineNumber, "background", "error-line");
                //editor.markText({line:i,ch:error.charNumber},{line:i,ch:error.charNumber+1},{css: 'background-color: #ff0000'})
            }
        }
        return -1
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
    getTokensFrom(lineNumber, line) {
        line = line.toString()
        var state = 1
        var tokens = []
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
                        tokens.push(new InstanceName(line.substring(0, i)))
                        tokens.push(new Seperator(line[i]))
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
                    if (line[i].match('[a-zäöüßA-ZÄÖÜ]')) {
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
                    } else if (line[i] == ')') {
                        tokens.push(line.substring(seperatorIndex+1, line.length))
                        state = 7
                    } else {
                        this.invalidInputCharacterError(lineNumber, line, i)
                    }
                    break;
                case 6:
                    if (line[i].match('[0-9]')) {
                        state = 6
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

    invalidInputCharacterError(lineNumber, line, charNumber) {
        throw new InvalidInputCharacterError(lineNumber, line, charNumber)
    }
    
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