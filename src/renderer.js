
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
        this.svgEl.style['-webkit-user-select'] = 'none'
        this.svgEl.style['-moz-user-select'] = 'none'
        this.svgEl.style['-ms-user-select'] = 'none'
        this.svgEl.style['user-select'] = 'none'
    }

    create (tag, attrs, parent) {
        const el = document.createElementNS(xmlns, tag)
        if (attrs) {
            this.attr(el, attrs)
        }
        (parent || this.svgEl || this.parent).appendChild(el)
        return el
    }

    attr (el, attrs) {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key])
        }
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
