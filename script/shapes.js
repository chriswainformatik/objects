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
}

class KREIS extends SHAPE {

    constructor(instanceName) {
        super(instanceName)
        this.w = 60
        this.h = 60
    }
    
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
    }
    
    breiteSetzen(b) {
        this.w = b
    }

    höheSetzen(h) {
        this.h = h
    }

    positionSetzen(x, y) {
        this.x = x
        this.y = y - this.h
    }

    create() {
        var baseLength = 100

        var elementWrapper = document.createElement('div')
        elementWrapper.id = this.instanceName
        elementWrapper.style.position = 'relative'
        elementWrapper.style.top = (this.y - this.baseLength) + 'px'
        elementWrapper.style.left = this.x + 'px'
        elementWrapper.style.width = baseLength + 'px'
        elementWrapper.style.height = baseLength + 'px'

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
        elementWrapper.style.transformOrigin = '0 ' + baseLength + 'px'

        var scaleX = this.w / baseLength
        var scaleY = this.h / baseLength
        elementWrapper.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')'
        
        var element = document.createElement('div')
        element.id = this.instanceName + '-inner'
        var diagonalLength = ( Math.floor(Math.sqrt( Math.pow(baseLength-this.lineWidth,2) / 2 )) ) + 'px'
        element.style.width = diagonalLength
        element.style.height = diagonalLength
        element.style.transform = 'translateX(' + (baseLength/2-this.lineWidth) + 'px) translateY(' + (baseLength/2) + 'px) rotate(45deg)'
        element.style.transformOrigin = '0 0'

        element.style.backgroundColor = this.fillColor
        element.style.borderStyle = this.lineStyle
        element.style.borderColor = this.lineColor
        element.style.borderWidth = this.lineWidth + 'px'

        elementWrapper.appendChild(element)

        /*
        var element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        element.setAttribute('points', '0,0 100,0 50,100');
        element.setAttribute("fill", "green");
        element.style.position = 'relative'
        element.style.top = this.y + 'px'
        element.style.left = this.x + 'px'
        element.style.width = 0
        element.style.height = 0
        */

        /*
        var triangleStyle = document.createElement("style");
        triangleStyle.innerHTML =
            '#' + this.instanceName + `:after {
                position:absolute;
                content:"";
                width: 0;
                height: 0;
                margin-top: ` + this.lineWidth + ` px;
                margin-left: ` + this.lineWidth + `px;
                border-left: ` + this.h + `px solid transparent;
                border-right: ` + this.h + `px solid transparent;
                border-bottom: ` + this.w + `px solid ` + this.fillColor + `;
            }
            #` + this.instanceName + `:before {
                position:absolute;
                content:"";
                width: 0;
                height: 0;
                border-left: ` + (this.lineWidth+this.h) + `px solid transparent;
                border-right: ` + (this.lineWidth+this.h) + `px solid transparent;
                border-bottom: ` + (this.lineWidth+this.w) + `px solid ` + this.lineColor + `;
            }`
            document.head.appendChild(triangleStyle);
            */

        //return element
        return elementWrapper
    }
}