class SHAPE {
    x = 50
    y = 50
    w = 150
    h = 100
    fillColor = 'red'
    lineColor = 'black'
    lineWidth = 8
    lineStyle = 'solid'
    type = undefined

    constructor(instanceName) {
        this.instanceName = instanceName
    }

    füllfarbesetzen(f) {
        this.fillColor = globalColorNames[f]
    }
}

class KREIS extends SHAPE {

    constructor(instanceName) {
        super(instanceName)
        this.w = 100
        this.h = 100
        this.y = 150
        this.x = 100
        this.type = 'circle'
    }

    radiussetzen(r) {
        this.w = r*2
        this.h = r*2
        this.mittelpunktsetzen(this.x, this.y)
    }

    mittelpunktsetzen(x, y) {
        this.x = x
        this.y = y
    }

    füllfarbesetzen(f) {
        this.fillColor = globalColorNames[f]
        this.mittelpunktsetzen(this.x, this.y)
    }
}

class RECHTECK extends SHAPE {

    constructor(instanceName) {
        super(instanceName)
        this.x = 150
        this.y = 150
        this.fillColor = 'blue'
        this.type = 'rectangle'
    }
    
    breitesetzen(b) {
        this.w = b
    }

    längesetzen(l) {
        this.h = l
    }

    positionsetzen(x, y) {
        this.x = x
        this.y = y
    }

}

class DREIECK extends SHAPE {
    constructor(instanceName) {
        super(instanceName)
        this.w = 150
        this.h = 100
        this.y = 200
        this.x = 150
        this.fillColor = 'green'
        this.type = 'triangle'

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
        this.y = y
    }
}