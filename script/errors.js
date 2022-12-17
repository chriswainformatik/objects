class InvalidInputCharacterError extends Error {
    constructor(lineNumber, lineText, charNumber) {
        super('Invalid input character: ' + lineText + ' (character ' + charNumber + ')')
        this.lineNumber = lineNumber
        this.lineText = lineText
        this.charNumber = charNumber
    }
}

class UnknownClassNameError extends Error {
    constructor(lineNumber, className) {
        super('Unknown class name in line ' + lineNumber + ': ' + className)
        this.lineNumber = lineNumber
        this.className = className
    }
}