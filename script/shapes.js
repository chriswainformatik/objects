class SHAPE {
    x = 100
    y = 50
    w = 50
    h = 50
    fillColor = 'red'
    lineColor = 'black'
    lineWidth = 0
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
}

class KREIS extends SHAPE {
    
    radiusSetzen(r) {
        this.w = r
        this.h = r
    }

    mittelpunktSetzen(x, y) {
        this.x = x
        this.y = y
    }
    
    create() {
        var element = document.createElement('div')
        element.id = this.instanceName
        element.style.position = 'relative'
        element.style.top = (this.y - this.h/2) + 'px'
        element.style.left = (this.x - this.w/2) + 'px'
        element.style.width = this.w + 'px'
        element.style.height = this.h + 'px'
        element.style.borderRadius = this.w/2 + 'px'
        element.style.backgroundColor = this.fillColor
        element.style.borderStyle = this.lineStyle
        element.style.borderColor = this.lineColor
        element.style.borderWidth = this.lineWidth
        return element
    }

}

class RECHTECK extends SHAPE {
    
    breiteSetzen(b) {
        this.w = b
    }

    längeSetzen(l) {
        this.h = l
    }

    positionSetzen(x, y) {
        this.x = x
        this.y = y
    }

    create() {
        var element = document.createElement('div')
        element.id = this.instanceName
        element.style.position = 'relative'
        element.style.top = this.y + 'px'
        element.style.left = this.x + 'px'
        element.style.width = this.w + 'px'
        element.style.height = this.h + 'px'
        element.style.borderRadius = this.w/2 + 'px'
        element.style.backgroundColor = this.fillColor
        element.style.borderStyle = this.lineStyle
        element.style.borderColor = this.lineColor
        element.style.borderWidth = this.lineWidth
        return element
    }
}

class DREIECK extends SHAPE {

}