import { svg, path } from './renderer'
import { Series } from './series'

class Chart {
    constructor (parent, config) {
        this.parent = parent
        const xPoints = config.columns[0].slice(1)
        this.series = config.columns.slice(1).map(obj => {
            const key = obj[0]
            return new Series(
                xPoints,
                obj.slice(1),
                config.names[key],
                config.colors[key]
            )
        })
    }

    render () {
        const svgEl = svg({ width: 200, height: 100 })
        const pathEl = path({ d: 'M0 0 h50 v50 h-50 z', fill: 'red' })
        svgEl.appendChild(pathEl)
        this.parent.appendChild(svgEl)
    }
}

window.tgc = { Chart }
