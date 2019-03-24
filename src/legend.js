import { snap } from './utils'
import { animateLegendIcon } from './animation'
import { checkIconPath, emptyIconPath } from './constants'

const defaults = {
    padding: 15,
    innerPadding: 8,
    titleColor: { day: '#333333', night: 'lightgray' },
    borderColor: { day: 'lightgray', night: 'gray' },
    margin: 10,
    iconSize: 24
}

export class Legend {
    constructor (chart) {
        this.chart = chart
        this.x = 0
        this.state = true
    }

    render (box) {
        const me = this
        me.box = box

        this.chart.series.map(ser => {
            this.renderLegendItem(ser, () => {
                this.chart.setRangeY()
            })
        })
    }

    renderLegendItem (series, onclick) {
        const pad = (coord, offset) => snap(coord + defaults.padding, offset)
        const titleOffset = defaults.iconSize + defaults.margin

        const iconX = pad(this.box.x + this.x + defaults.innerPadding)
        const iconY = pad(this.box.y + defaults.innerPadding)
        const icon = this.chart.renderer.path({
            fill: series.attrs.color,
            d: checkIconPath,
            stroke: 'none',
            transform: 'translate(' + iconX + ' ' + iconY + ')'
        })

        const titleX = pad(this.box.x + this.x + titleOffset + defaults.innerPadding)
        const titleY = pad(this.box.y + 18 + defaults.innerPadding)
        this.title = this.chart.renderer.text(series.attrs.name, {
            fill: defaults.titleColor[this.chart.mode],
            stroke: 'none',
            'font-size': '16px',
            transform: 'translate(' + titleX + ' ' + titleY + ')'
        })

        const titleWidth = this.title['getBBox']().width

        const radius = 20
        const borderWidth = titleWidth + titleOffset - radius
        const borderX = pad(this.box.x + this.x)
        const borderY = pad(this.box.y, 0.5)
        const border = this.chart.renderer.path({
            d: 'M20,0 h' + borderWidth +
                ' a20,20 0 0 1 20,20 a20,20 0 0 1 -20,20 h-' +
                borderWidth + ' a20,20 0 0 1 -20,-20 a20,20 0 0 1 20,-20 z',
            fill: 'transparent',
            cursor: 'pointer',
            stroke: defaults.borderColor[this.chart.mode],
            transform: 'translate(' + borderX + ' ' + borderY + ')'
        })

        const clickHandler = () => {
            const visible = series.toggle()
            icon.setAttribute('d', visible ? checkIconPath : emptyIconPath)
            animateLegendIcon(icon)
            onclick(this.state)
        }

        border.addEventListener('click', event => {
            clickHandler()
        })

        this.x += titleOffset + titleWidth + defaults.padding * 2
    }
}
