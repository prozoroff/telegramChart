
import { Chart } from './chart'
import { snap } from './utils'

const round = Math.round
const snapBox = (box, offset) => {
    return {
        x: snap(box.x, offset),
        y: snap(box.y, offset),
        width: round(box.width),
        height: round(box.height)
    }
}

const controlWidth = 8
const minRangePx = 50

export class Navigator {
    constructor (renderer, config) {
        this.renderer = renderer
        this.chart = new Chart(renderer, config)
    }

    render (box) {
        const me = this

        me.chart.render(box)
        me.box = box

        me.setLeft(box.width * 0.5)
        me.setRight(box.width * 0.7)
        me.setCentral()

        const leftMoveHandler = event => {
            const dx = event.clientX - leftMoveHandler.x
            if (me.leftX + dx + minRangePx < me.rightX && me.leftX + dx > box.x) {
                leftMoveHandler.x = event.clientX
                me.setLeft(me.leftX + dx)
                me.setCentral()
            }
        }

        const rightMoveHandler = event => {
            const dx = event.clientX - rightMoveHandler.x
            if (me.leftX < me.rightX + dx - minRangePx && me.rightX + dx < box.x + box.width) {
                rightMoveHandler.x = event.clientX
                me.setRight(me.rightX + dx)
                me.setCentral()
            }
        }

        const centralMoveHandler = event => {
            const dx = event.clientX - centralMoveHandler.x
            if (me.leftX + dx > box.x && me.rightX + dx < box.x + box.width) {
                centralMoveHandler.x = event.clientX
                me.setLeft(me.leftX + dx)
                me.setRight(me.rightX + dx)
                me.setCentral()
            }
        }

        this.leftControl.addEventListener('mousedown', event => {
            leftMoveHandler.x = event.clientX
            me.renderer.svgEl.addEventListener('mousemove', leftMoveHandler)
        })

        this.rightControl.addEventListener('mousedown', event => {
            rightMoveHandler.x = event.clientX
            me.renderer.svgEl.addEventListener('mousemove', rightMoveHandler)
        })

        this.centralStripe.addEventListener('mousedown', event => {
            centralMoveHandler.x = event.clientX
            me.renderer.svgEl.addEventListener('mousemove', centralMoveHandler)
        })

        this.renderer.svgEl.addEventListener('mouseup', () => {
            me.renderer.svgEl.removeEventListener('mousemove', leftMoveHandler)
            me.renderer.svgEl.removeEventListener('mousemove', rightMoveHandler)
            me.renderer.svgEl.removeEventListener('mousemove', centralMoveHandler)
        })
    }

    setCentral () {
        const me = this
        const box = me.box

        const coords = snapBox({
            x: me.leftX,
            y: box.y,
            width: me.rightX - me.leftX,
            height: box.height - 1
        }, 0.5)

        if (!me.centralStripe) {
            me.centralStripe = this.renderer.path({
                d: me.getD(coords),
                fill: 'transparent',
                stroke: 'lightgray',
                'stroke-width': 1,
                cursor: 'pointer'
            })
        } else {
            me.centralStripe.setAttribute('d', me.getD(coords))
        }
    }

    setLeft (x) {
        const me = this
        const box = me.box
        me.leftX = x

        const coords = snapBox({
            x: box.x,
            y: box.y,
            width: x - box.x,
            height: box.height
        })

        const coordsControl = snapBox({
            x: box.x + x - controlWidth / 2,
            y: box.y,
            width: controlWidth,
            height: box.height
        })

        if (!me.leftStripe) {
            me.leftStripe = me.sideStripe(coords)
            me.leftControl = me.sideControl(coordsControl)
        } else {
            me.leftStripe.setAttribute('d', me.getD(coords))
            me.leftControl.setAttribute('d', me.getD(coordsControl))
        }
    }

    setRight (x) {
        const me = this
        const box = me.box
        me.rightX = x

        const coords = snapBox({
            x: x,
            y: box.y,
            width: box.width - x,
            height: box.height
        })

        const coordsControl = snapBox({
            x: x - controlWidth / 2,
            y: box.y,
            width: controlWidth,
            height: box.height
        })

        if (!me.rightStripe) {
            me.rightStripe = me.sideStripe(coords)
            me.rightControl = me.sideControl(coordsControl)
        } else {
            me.rightStripe.setAttribute('d', me.getD(coords))
            me.rightControl.setAttribute('d', me.getD(coordsControl))
        }
    }

    getD (coord) {
        return [
            'M', coord.x, coord.y,
            'h', coord.width,
            'v', coord.height,
            'h', '-' + coord.width,
            'Z'
        ].join(' ')
    }

    sideStripe (coords) {
        return this.renderer.path({
            d: this.getD(coords),
            fill: 'dodgerblue',
            opacity: 0.1,
            stroke: 'none'
        })
    }

    sideControl (coords) {
        return this.renderer.path({
            d: this.getD(coords),
            fill: 'lightgray',
            cursor: 'pointer'
        })
    }
}
