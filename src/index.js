import { Chart } from './chart'
import { Renderer } from './renderer'
import { extendCopy } from './utils'

class tgChart {
    constructor (parent, config) {
        this.parent = parent
        this.config = config
        this.width = 600
        this.height = 400
        this.navigatorHeight = 80
        this.renderer = new Renderer(this.parent, {
            width: this.width,
            height: this.height,
            'font-family': 'Avenir',
            'font-size': '14px'
        })
    }

    render () {
        // main chart
        this.chart = new Chart(this.renderer, extendCopy(
            this.config,
            {
                strokeWidth: 2
            })
        )

        this.chart.render({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height - this.navigatorHeight
        })

        // navigator chart
        this.navigator = new Chart(this.renderer, extendCopy(
            this.config,
            {
                strokeWidth: 1,
                xAxisHidden: true,
                yAxisHidden: true
            })
        )

        this.navigator.render({
            x: 0,
            y: this.height - this.navigatorHeight,
            width: this.width,
            height: this.navigatorHeight
        })
    }
}

window.tgc = { Chart: tgChart }
