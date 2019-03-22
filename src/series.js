import { animate } from './animation'

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
            fill: 'none',
            transition: 'all 0.5s'
        })

        return this.path
    }

    scalePathX (xRange) {
        const scaleX = 1 / (xRange.max - xRange.min)
        this.scale[0] = scaleX

        const translateX = -(this.box.width * xRange.min)
        this.translate[0] = translateX

        this.setTransform()
    }

    scalePathY (yRange) {
        const scaleY = 1 / (yRange.max - yRange.min)
        const translateY = -(this.box.height * (1 - yRange.max))

        this.cancelAnimation && this.cancelAnimation()
        this.cancelAnimation = animate(this, translateY, scaleY)

        // this.setTransform()
    }

    setTransform () {
        const scaleStr = 'scale(' + this.scale.join(' ') + ')'
        const translateStr = 'translate(' + this.translate.join(' ') + ')'

        this.path.setAttribute('transform', scaleStr + ' ' + translateStr)
    }

    getYRange (xRange) {
        const points = this.points
        const yRange = { min: Infinity, max: -Infinity }

        for (let i = 0, l = points.length; i < l; i++) {
            const point = points[i]
            if (point.x > xRange.min && point.x < xRange.max) {
                const yVal = point.y
                yVal < yRange.min && (yRange.min = yVal)
                yVal > yRange.max && (yRange.max = yVal)
            }
        }
        return yRange
    }
}
