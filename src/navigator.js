
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

const controlWidth = 6
const controlBorder = 2
const activeWidth = 16
const minRangePx = 50

export class Navigator {
    constructor (renderer, config, onRange) {
        this.renderer = renderer
        this.chart = new Chart(renderer, config)
        this.onRange = onRange
    }

    render (box) {
        const me = this

        me.chart.render(box)
        me.box = box

        const leftX = this.leftX = box.x + box.width * 0.5
        const rightX = this.rightX = box.x + box.width * 1

        me.setCentral()
        me.setLeft(leftX)
        me.setRight(rightX)

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

        const svgEl = me.renderer.svgEl

        this.leftActive.addEventListener('mousedown', event => {
            leftMoveHandler.x = event.clientX
            svgEl.addEventListener('mousemove', leftMoveHandler)
        })

        this.rightActive.addEventListener('mousedown', event => {
            rightMoveHandler.x = event.clientX
            svgEl.addEventListener('mousemove', rightMoveHandler)
        })

        this.centralStripe.addEventListener('mousedown', event => {
            centralMoveHandler.x = event.clientX
            svgEl.addEventListener('mousemove', centralMoveHandler)
        })

        this.renderer.svgEl.addEventListener('mouseup', () => {
            svgEl.removeEventListener('mousemove', leftMoveHandler)
            svgEl.removeEventListener('mousemove', rightMoveHandler)
            svgEl.removeEventListener('mousemove', centralMoveHandler)
        })

        this.renderer.svgEl.addEventListener('mouseleave', (event) => {
            svgEl.removeEventListener('mousemove', leftMoveHandler)
            svgEl.removeEventListener('mousemove', rightMoveHandler)
            svgEl.removeEventListener('mousemove', centralMoveHandler)
        })
    }

    setCentral () {
        const me = this
        const box = me.box

        const coords = snapBox({
            x: me.leftX,
            y: box.y,
            width: me.rightX - me.leftX,
            height: box.height
        }, 0)

        if (!me.centralStripe) {
            me.centralStripe = this.renderer.path({
                d: me.getD(coords),
                fill: 'transparent',
                stroke: 'none',
                cursor: 'pointer'
            })
        } else {
            me.centralStripe.setAttribute('d', me.getD(coords))
        }

        const d = [
            'M', coords.x, coords.y,
            'h', coords.width,
            'v', coords.height,
            'h', '-' + coords.width,
            'Z',
            'M', coords.x + controlWidth, coords.y + controlBorder,
            'h', coords.width - controlWidth * 2,
            'v', coords.height - controlBorder * 2,
            'h', '-' + (coords.width - controlWidth * 2),
            'Z'
        ].join(' ')

        if (!me.centralBorder) {
            me.centralBorder = this.renderer.path({
                d,
                fill: 'lightgray',
                stroke: 'none',
                cursor: 'pointer',
                'fill-rule': 'evenodd',
                opacity: 0.5
            })
        } else {
            me.centralBorder.setAttribute('d', d)
        }

        this.onRange({
            min: (me.leftX - box.x) / box.width,
            max: (me.rightX - box.x) / box.width
        })
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

        const coordsActive = snapBox(me.controlCoords(activeWidth, x))

        if (!me.leftStripe) {
            me.leftStripe = me.sideStripe(coords)
            me.leftActive = me.sideActive(coordsActive)
        } else {
            me.leftStripe.setAttribute('d', me.getD(coords))
            me.leftActive.setAttribute('d', me.getD(coordsActive))
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

        const coordsActive = snapBox(me.controlCoords(activeWidth, x))

        if (!me.rightStripe) {
            me.rightStripe = me.sideStripe(coords)
            me.rightActive = me.sideActive(coordsActive)
        } else {
            me.rightStripe.setAttribute('d', me.getD(coords))
            me.rightActive.setAttribute('d', me.getD(coordsActive))
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

    sideActive (coords) {
        return this.renderer.path({
            d: this.getD(coords),
            fill: 'transparent',
            cursor: 'pointer'
        })
    }

    controlCoords (controlWidth, x) {
        return {
            x: x - controlWidth / 2,
            y: this.box.y,
            width: controlWidth,
            height: this.box.height
        }
    }
}
