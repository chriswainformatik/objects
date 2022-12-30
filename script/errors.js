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

class NoSuchMethodError extends Error {
    constructor(lineNumber, methodName) {
        super('No such method: ' + methodName)
        this.methodName = methodName
        this.lineNumber = lineNumber
        this.germanText = 'Die Methode <b><i>' + methodName + '</i></b> existiert nicht!'
    }
}