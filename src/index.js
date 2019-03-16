import { svg, path } from './renderer'

class Chart {
    constructor (parent, config) {
        this.parent = parent
    }

    render () {
        const svgEl = svg({ width: 200, height: 100 })
        const pathEl = path({ d: 'M0 0 h50 v50 h-50 z', fill: 'red' })
        svgEl.appendChild(pathEl)
        this.parent.appendChild(svgEl)
    }
}

window.tgc = { Chart }
