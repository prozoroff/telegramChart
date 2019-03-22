
export class Series {
    constructor (chart, xPoints, yPoints, attrs) {
        this.chart = chart
        this.points = []
        for (let i = 0, l = xPoints.length; i < l; i++) {
            this.points.push({ x: xPoints[i], y: yPoints[i] })
        }
        this.name = name
        this.attrs = attrs
        this.translate = [0, 0]
        this.scale = [1, 1]
    }

    render (box) {
        const xAxis = this.chart.xAxis
        const yAxis = this.chart.yAxis
        const points = this.points
        this.box = box

        const steps = []
        for (let i = 0, l = points.length; i < l; i++) {
            const point = points[i]
            const xCoord = box.x + xAxis.valToPos(point.x) * box.width
            const yCoord = box.y + (1 - yAxis.valToPos(point.y)) * box.height
            steps.push((i === 0 ? 'M' : 'L') + xCoord + ' ' + yCoord)
        }

        this.path = this.chart.renderer.path({
            d: steps.join(' '),
            stroke: this.attrs.color,
            'stroke-width': this.attrs.strokeWidth,
            'vector-effect': 'non-scaling-stroke',
            fill: 'none'
        })

        return this.path
    }

    scalePath (range) {
        const scaleX = 1 / (range.max - range.min)
        this.scale = [scaleX, 1]

        const translateX = -(this.box.width * range.min)
        this.translate = [translateX, 0]

        const scaleStr = 'scale(' + this.scale.join(' ') + ')'
        const translateStr = 'translate(' + this.translate.join(' ') + ')'

        this.path.setAttribute('transform', scaleStr + ' ' + translateStr)
    }
}
