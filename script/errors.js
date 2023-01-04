class InvalidInputCharacterError extends Error {
    constructor(lineNumber, lineText, charNumber) {
        super('Invalid input character: ' + lineText + ' (character ' + charNumber + ')')
        this.lineNumber = lineNumber
        this.lineText = lineText
        this.charNumber = charNumber
    }
}

class NoSuchClassError extends Error {
    constructor(lineNumber, className) {
        super('Unknown class name in line ' + lineNumber + ': ' + className)
        this.lineNumber = lineNumber
        this.className = className
        this.germanText = 'Die Klasse <b><i>' + className +  '</i></b> existiert nicht!'
    }
}

class NoSuchInstanceError extends Error {
    constructor(lineNumber, instanceName) {
        super('No such instance: ' + instanceName)
        this.instanceName = instanceName
        this.lineNumber = lineNumber
        this.germanText = 'Das Objekt <b><i>' + instanceName + '</i></b> existiert nicht!'
    }
}

class DuplicateInstanceError extends Error {
    constructor(lineNumber, instanceName) {
        super('Duplicate instance: ' + instanceName)
        this.instanceName = instanceName
        this.lineNumber = lineNumber
        this.germanText = 'Das Objekt <b><i>' + instanceName + '</i></b> wurde bereits erzeugt!'
    }
}

class NoSuchMethodError extends Error {
    constructor(lineNumber, methodName) {
        super('No such method: ' + methodName)
        this.methodName = methodName
        this.lineNumber = lineNumber
        this.germanText = 'Die Methode <b><i>' + methodName + '</i></b> existiert nicht!'
    }
}

class WrongArgumentCountError extends Error {
    constructor(lineNumber, methodName) {
        super('Wrong number of arguments in method: ' + methodName)
        this.methodName = methodName
        this.lineNumber = lineNumber
        this.germanText = 'Die Methode <b><i>' + methodName + '</i></b> benötigt weniger oder mehr Werte!'
    }
}

class MyIllegalArgumentError extends Error {
    constructor(lineNumber, methodName, argument, datatype) {
        if (datatype === undefined) {
            // value not allowed
            super('Wrong argument value in method: ' + methodName + ' (argument ' + argument + ' is not allowed)')
            this.germanText = 'Der Wert <b><i>' + argument +'</i></b> in der Methode <b><i>' + methodName + '</i></b> ist nicht erlaubt!'
        } else {
            // value must be a number
            super('Wrong datatype in method: ' + methodName + ' (argument: ' + argument + ' must be ' + datatype + ')')
            this.germanText = 'Der Wert <b><i>' + argument +'</i></b> in der Methode <b><i>' + methodName + '</i></b> ist keine Zahl!'
        }
        this.methodName = methodName
            this.lineNumber = lineNumber
    }
}