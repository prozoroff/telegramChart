import { path } from './renderer'

export class Series {
    constructor (chart, xPoints, yPoints, name, color) {
        this.points = []
        for (let i = 0, l = xPoints.length; i < l; i++) {
            this.points.push({ x: xPoints[i], y: yPoints[i] })
        }
        this.name = name
        this.color = color
        this.chart = chart
    }

    render (box) {
        const xAxis = this.chart.xAxis
        const yAxis = this.chart.yAxis
        const points = this.points

        const steps = []
        for (let i = 0, l = points.length; i < l; i++) {
            const point = points[i]
            const xCoord = box.x + xAxis.valToPos(point.x) * box.width
            const yCoord = box.y + yAxis.valToPos(point.y) * box.height
            steps.push((i === 0 ? 'M' : 'L') + xCoord + ' ' + yCoord)
        }

        const seriesPath = path({
            d: steps.join(' '),
            stroke: this.color,
            fill: 'none'
        })
        this.chart.svg.appendChild(seriesPath)

        return seriesPath
    }
}
