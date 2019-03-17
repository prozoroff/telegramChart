
export class Series {
    constructor (chart, xPoints, yPoints, attrs) {
        this.chart = chart
        this.points = []
        for (let i = 0, l = xPoints.length; i < l; i++) {
            this.points.push({ x: xPoints[i], y: yPoints[i] })
        }
        this.name = name
        this.attrs = attrs
    }

    render (box) {
        const xAxis = this.chart.xAxis
        const yAxis = this.chart.yAxis
        const points = this.points

        const steps = []
        for (let i = 0, l = points.length; i < l; i++) {
            const point = points[i]
            const xCoord = box.x + xAxis.valToPos(point.x) * box.width
            const yCoord = box.y + (1 - yAxis.valToPos(point.y)) * box.height
            steps.push((i === 0 ? 'M' : 'L') + xCoord + ' ' + yCoord)
        }

        const seriesPath = this.chart.renderer.path({
            d: steps.join(' '),
            stroke: this.attrs.color,
            'stroke-width': this.attrs.strokeWidth,
            fill: 'none'
        })

        return seriesPath
    }
}
