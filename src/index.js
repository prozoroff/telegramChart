import { Chart } from './chart'
import { Renderer } from './renderer'
import { extendCopy } from './utils'
import { Navigator } from './navigator'
import { Legend } from './legend'

const navigatorHeight = 80
const legendHeight = 60

class tgChart {
    constructor (parent, config, mode) {
        this.parent = parent
        this.config = config
        this.width = config.width || 600
        this.height = config.height || 400
        this.renderer = new Renderer(this.parent, {
            width: this.width,
            height: this.height,
            'font-family': 'Avenir',
            'font-size': '14px'
        })

        this.chart = new Chart(
            this.renderer,
            extendCopy(this.config, { 'strokeWidth': 2 }),
            mode
        )

        this.navigator = new Navigator(
            this.renderer,
            extendCopy(this.config, { 'strokeWidth': 1, 'xAxisHidden': true, 'yAxisHidden': true }),
            range => {
                this.chart.setRange(range)
            }
        )

        this.legend = new Legend(this.chart)

        this.chart.render({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height - navigatorHeight - legendHeight
        })

        this.navigator.render({
            x: 0,
            y: this.height - navigatorHeight - legendHeight,
            width: this.width,
            height: navigatorHeight
        })

        this.legend.render({
            x: 0,
            y: this.height - legendHeight,
            width: this.width,
            height: legendHeight
        })
    }
}

window['tgc'] = { 'Chart': tgChart }
