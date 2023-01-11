class SHAPE {
    x = 50
    y = 50
    w = 140
    h = 125
    fillColor = 'red'
    lineColor = 'black'
    lineWidth = 4
    lineStyle = 'solid'

    constructor(instanceName) {
        this.instanceName = instanceName
    }
    /**
     * Creates the object and returns it as DOM element with the instanceName as id.
     * Must be overriden by sublasses.
     */
    create() {
        return undefined
    }

    füllfarbesetzen(f) {
        this.fillColor = globalColorNames[f]
    }
}

class KREIS extends SHAPE {

    constructor(instanceName) {
        super(instanceName)
        this.w = 60
        this.h = 60
    }

    radiussetzen(r) {
        this.w = r
        this.h = r
        this.mittelpunktsetzen(this.x, this.y)
    }

    mittelpunktsetzen(x, y) {
        this.x = x - this.h/2
        this.y = y - this.h/2
    }
    
    create() {
        var element = document.createElement('div')
        element.id = this.instanceName
        element.classList.add('graphical-object')
        element.dataset.classname = 'KREIS'
        element.style.position = 'absolute'
        element.style.top = (this.y - this.h/2) + 'px'
        element.style.left = (this.x - this.w/2) + 'px'
        element.style.width = this.w + 'px'
        element.style.height = this.h + 'px'
        element.style.borderRadius = this.w/2 + 'px'
        element.style.backgroundColor = this.fillColor
        element.style.borderStyle = this.lineStyle
        element.style.borderColor = this.lineColor
        element.style.borderWidth = this.lineWidth + 'px'
        return element
    }

}

class RECHTECK extends SHAPE {

    constructor(instanceName) {
        super(instanceName)
        this.x = 100
        this.fillColor = 'blue'
    }
    
    breitesetzen(b) {
        this.w = b
    }

    längesetzen(l) {
        this.h = l
    }

    positionsetzen(x, y) {
        this.x = x
        this.y = y - this.h
    }

    create() {
        var element = document.createElement('div')
        element.id = this.instanceName
        element.classList.add('graphical-object')
        element.dataset.classname = 'RECHTECK'
        element.style.position = 'absolute'
        element.style.top = this.y + 'px'
        element.style.left = this.x + 'px'
        element.style.width = this.w + 'px'
        element.style.height = this.h + 'px'
        element.style.backgroundColor = this.fillColor
        element.style.borderStyle = this.lineStyle
        element.style.borderColor = this.lineColor
        element.style.borderWidth = this.lineWidth + 'px'
        return element
    }
}

class DREIECK extends SHAPE {
    constructor(instanceName) {
        super(instanceName)
        this.w = 120
        this.h = 140
        this.y = 100
        this.fillColor = 'green'

        // used to create the DOM element
        this.baseLength = 100
    }
    
    breitesetzen(b) {
        this.w = b
    }

    höhesetzen(h) {
        this.h = h
    }

    positionsetzen(x, y) {
        this.x = x
        this.y = y - this.h
    }

    create() {
        var elementWrapper = document.createElement('div')
        elementWrapper.id = this.instanceName
        elementWrapper.classList.add('graphical-object')
        elementWrapper.dataset.classname = 'DREIECK'
        elementWrapper.style.position = 'absolute'
        elementWrapper.style.top = (this.y - this.baseLength) + 'px'
        elementWrapper.style.left = this.x + 'px'
        elementWrapper.style.width = this.baseLength + 'px'
        elementWrapper.style.height = this.baseLength + 'px'

        elementWrapper.style.borderBottomStyle = this.lineStyle
        elementWrapper.style.borderBottomColor = this.lineColor
        elementWrapper.style.borderBottomWidth = this.lineWidth + 'px'
        // make the corners sharp
        elementWrapper.style.borderLeftStyle = 'solid'
        elementWrapper.style.borderLeftColor = 'transparent'
        elementWrapper.style.borderLeftWidth = this.lineWidth + 'px'
        elementWrapper.style.borderRightStyle = 'solid'
        elementWrapper.style.borderRightColor = 'transparent'
        elementWrapper.style.borderRightWidth = this.lineWidth + 'px'

        elementWrapper.style.overflow = 'hidden'
        elementWrapper.style.transformOrigin = '0 ' + this.baseLength + 'px'

        var scaleX = this.w / this.baseLength
        var scaleY = this.h / this.baseLength
        elementWrapper.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')'
        
        var element = document.createElement('div')
        element.id = this.instanceName + '-inner'
        var diagonalLength = ( Math.floor(Math.sqrt( Math.pow(this.baseLength-this.lineWidth,2) / 2 )) ) + 'px'
        element.style.width = diagonalLength
        element.style.height = diagonalLength
        element.style.transform = 'translateX(' + (this.baseLength/2-this.lineWidth) + 'px) translateY(' + (this.baseLength/2) + 'px) rotate(45deg)'
        element.style.transformOrigin = '0 0'

        element.style.backgroundColor = this.fillColor
        element.style.borderStyle = this.lineStyle
        element.style.borderColor = this.lineColor
        element.style.borderWidth = this.lineWidth + 'px'

        elementWrapper.appendChild(element)

        //return element
        return elementWrapper
    }
}