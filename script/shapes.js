class SHAPE {
    x = 50
    y = 50
    w = 150
    h = 100
    fillColor = 'red'
    lineColor = 'black'
    lineWidth = 4
    lineStyle = 'solid'
    type = undefined

    constructor(instanceName) {
        this.instanceName = instanceName
    }

    füllfarbesetzen(f) {
        this.fillColor = globalColorNames[f]
    }

    linienstärkesetzen(s) {
        this.lineWidth = s
    }

    linienfarbesetzen(f) {
        this.lineColor = globalColorNames[f]
    }

    linienartsetzen(a) {
        this.lineStyle = globalLineStyleNames[a]
    }
}

class KREIS extends SHAPE {

    constructor(instanceName) {
        super(instanceName)
        this.w = 50
        this.h = 50
        this.y = 75
        this.x = 50
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
        this.x = 75
        this.y = 75
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
        this.w = 75
        this.h = 50
        this.y = 100
        this.x = 75
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