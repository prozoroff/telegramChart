
import { Chart } from './chart'

export class Navigator {
    constructor (renderer, config) {
        this.renderer = renderer
        this.chart = new Chart(renderer, config)
    }

    render (box) {
        const range = { min: 0.5, max: 0.8 }
        const controlWidth = 4

        this.chart.render(box)

        const coordsLeft = {
            x: box.x,
            y: box.y,
            width: range.min * box.width,
            height: box.height
        }

        const coordsLeftControl = {
            x: box.x + range.min * box.width - controlWidth / 2,
            y: box.y,
            width: controlWidth,
            height: box.height
        }

        const coordRight = {
            x: box.x + range.max * box.width,
            y: box.y,
            width: (1 - range.max) * box.width,
            height: box.height
        }

        const coordsRightControl = {
            x: box.x + range.max * box.width - controlWidth / 2,
            y: box.y,
            width: controlWidth,
            height: box.height
        }

        const coordCentral = {
            x: box.x + range.min * box.width,
            y: box.y,
            width: (range.max - range.min) * box.width,
            height: box.height
        }

        const getD = coord => {
            return [
                'M', coord.x, coord.y,
                'h', coord.width,
                'v', coord.height,
                'h', '-' + coord.width,
                'Z'
            ].join(' ')
        }

        const sideStripe = coords => this.renderer.path({
            d: getD(coords),
            fill: 'dodgerblue',
            opacity: 0.1
        })

        const sideControl = coords => this.renderer.path({
            d: getD(coords),
            fill: 'lightgray'
        })

        this.leftStripe = sideStripe(coordsLeft)
        this.rightStripe = sideStripe(coordRight)

        this.leftControl = sideControl(coordsLeftControl)
        this.rightControl = sideControl(coordsRightControl)

        this.centralStripe = this.renderer.path({
            d: getD(coordCentral),
            fill: 'none',
            stroke: 'lightgray',
            'stroke-width': 2
        })
    }
}
