import { snap } from './utils'

const checkIconPath = 'M 13 0.1875 C 5.925781 0.1875 0.1875 5.925781 0.1875 13 C 0.1875 20.074219 5.925781 25.8125 13 25.8125 C 20.074219 25.8125 25.8125 20.074219 25.8125 13 C 25.8125 5.925781 20.074219 0.1875 13 0.1875 Z M 19.734375 9.035156 L 12.863281 19.167969 C 12.660156 19.46875 12.335938 19.671875 12.015625 19.671875 C 11.695313 19.671875 11.34375 19.496094 11.117188 19.273438 L 7.085938 15.238281 C 6.8125 14.964844 6.8125 14.515625 7.085938 14.242188 L 8.082031 13.246094 C 8.355469 12.972656 8.804688 12.972656 9.074219 13.246094 L 11.699219 15.867188 L 17.402344 7.453125 C 17.621094 7.132813 18.0625 7.050781 18.382813 7.265625 L 19.550781 8.058594 C 19.867188 8.273438 19.953125 8.714844 19.734375 9.035156 Z'
const defaults = {
    padding: 15,
    innerPadding: 7,
    titleColor: '#333333',
    borderColor: 'lightgray',
    margin: 10,
    iconSize: 24
}

export class Legend {
    constructor (chart) {
        this.chart = chart
        this.x = 0
    }

    render (box) {
        const me = this
        me.box = box

        this.chart.series.map(ser => {
            this.renderLegendItem(ser.attrs.name, ser.attrs.color, () => {

            })
        })
    }

    renderLegendItem (name, color, onclick) {
        const pad = (coord, offset) => snap(coord + defaults.padding, offset)
        const titleOffset = defaults.iconSize + defaults.margin

        const iconX = pad(this.box.x + this.x + defaults.innerPadding)
        const iconY = pad(this.box.y + defaults.innerPadding)
        this.icon = this.chart.renderer.path({
            fill: color,
            d: checkIconPath,
            stroke: 'none',
            transform: 'translate(' + iconX + ' ' + iconY + ')'
        })

        const titleX = pad(this.box.x + this.x + titleOffset + defaults.innerPadding)
        const titleY = pad(this.box.y + 18 + defaults.innerPadding)
        this.title = this.chart.renderer.text(name, {
            fill: defaults.titleColor,
            stroke: 'none',
            'font-size': '16px',
            transform: 'translate(' + titleX + ' ' + titleY + ')'
        })

        const titleWidth = this.title.getBBox().width

        const radius = 20
        const borderWidth = titleWidth + titleOffset - radius
        const borderX = pad(this.box.x + this.x)
        const borderY = pad(this.box.y, 0.5)
        this.border = this.chart.renderer.path({
            d: 'M20,0 h' + borderWidth +
                ' a20,20 0 0 1 20,20 a20,20 0 0 1 -20,20 h-' +
                borderWidth + ' a20,20 0 0 1 -20,-20 a20,20 0 0 1 20,-20 z',
            fill: 'transparent',
            cursor: 'pointer',
            stroke: defaults.borderColor,
            transform: 'translate(' + borderX + ' ' + borderY + ')'
        })

        this.x += titleOffset + titleWidth + defaults.padding * 2
    }
}
