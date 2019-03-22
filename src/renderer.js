
const xmlns = 'http://www.w3.org/2000/svg'

export class Renderer {
    constructor (parent, attrs) {
        this.parent = parent
        this.svgEl = this.svg(attrs)
        this.background = this.rect({
            width: attrs.width,
            height: attrs.height,
            fill: 'transparent'
        })
    }

    create (tag, attrs, parent) {
        const el = document.createElementNS(xmlns, tag)
        if (attrs) {
            for (let key in attrs) {
                el.setAttribute(key, attrs[key])
            }
        }
        (parent || this.svgEl || this.parent).appendChild(el)
        return el
    }

    svg (attrs, parent) {
        return this.create('svg', attrs, parent)
    }

    path (attrs, parent) {
        return this.create('path', attrs, parent)
    }

    g (attrs, parent) {
        return this.create('g', attrs, parent)
    }

    rect (attrs, parent) {
        return this.create('rect', attrs, parent)
    }

    text (value, attrs, parent) {
        const el = this.create('text', attrs, parent)
        el.innerHTML = value
        return el
    }
}
