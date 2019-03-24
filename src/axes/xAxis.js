import { shortMonths } from '../constants'
import { Axis, defaults } from './axis'

const ticksNumber = 6

export class AxisX extends Axis {
    renderTicks () {
        const metrics = this.metrics
        const range = this.range
        const box = this.box

        const delta = (range.max - range.min) / (ticksNumber - 1)
        const inRange = val => val >= range.min - delta && val <= range.max + delta
        const fillNewTicks = () => {
            const result = []
            for (let i = 0; i < ticksNumber; i++) {
                result.push({
                    val: range.min + i * delta
                })
            }
            return result
        }

        if (!this.ticks) {
            this.ticks = fillNewTicks()
            this.ticksGroup = this.getGroup()
            const axisHeight = AxisX.getSize(metrics)
            this.chart.renderer.rect({
                x: box.x,
                y: box.y + box.height - axisHeight,
                height: axisHeight,
                width: box.width,
                fill: 'none'
            }, this.ticksGroup)
        } else {
            const filteredTicks = this.filterTicks(this.ticks, delta, inRange)

            if (filteredTicks.length) {
                let tickIndex = filteredTicks.length
                const valDelta = filteredTicks[1]
                    ? filteredTicks[1].val - filteredTicks[0].val
                    : delta
        
                if (this.direction === 'r') {
                    let val = filteredTicks[0].val - valDelta
                    while (tickIndex < ticksNumber) {
                        filteredTicks.unshift({ val })
                        tickIndex++
                        val -= valDelta
                    }
                } else if (this.direction === 'l') {
                    let val = filteredTicks[filteredTicks.length - 1].val + valDelta
                    while (tickIndex < ticksNumber) {
                        filteredTicks.push({ val })
                        tickIndex++
                        val += valDelta
                    }
                }
                this.ticks = filteredTicks
            } else {
                this.ticks = fillNewTicks()
            }
        }

        const yCoord = box.y + box.height - metrics.descent - defaults.padding
        for (let i = 0, l = this.ticks.length; i < l; i++) {
            const tick = this.ticks[i]
            const val = tick.val
            const coords = {
                x: box.x + this.valToPos(val) * box.width + metrics.width * (0.5 - 2 * i / l),
                y: yCoord
            }
            const text = this.valToText(val)
            if (tick.el) {
                this.chart.renderer.attr(tick.el, coords)
            } else {
                tick.el = this.chart.renderer.text(
                    text,
                    coords,
                    this.ticksGroup
                )
            }
        }
    }

    filterTicks (ticks, delta, inRange) {
        const result = []
        const inDelta = d => d < delta * 1.2 && d > delta / 1.2
        const inDeltaRight = d => d < delta * 1.2
        const remove = el => el.parentNode.removeChild(el)

        if (this.direction === 'l') {
            const firstTick = ticks[0]
            if (inDeltaRight(firstTick.val - this.range.min)) {
                result.push(firstTick)
            } else {
                remove(firstTick.el)
            }

            for (let i = 1; i < ticks.length; i++) {
                const tick = ticks[i]
                if (result.length && inRange(tick.val) && inDelta(tick.val - ticks[i - 1].val)) {
                    result.push(tick)
                } else {
                    remove(tick.el)
                }
            }
        } else if (this.direction === 'r') {
            const lastTick = ticks[ticks.length - 1]
            if (inDeltaRight(this.range.max - lastTick.val)) {
                result.push(lastTick)
            } else {
                remove(lastTick.el)
            }

            for (let i = ticks.length - 2; i >= 0; i--) {
                const tick = ticks[i]
                if (result.length && inRange(tick.val) && inDelta(ticks[i + 1].val - tick.val)) {
                    result.unshift(tick)
                } else {
                    remove(tick.el)
                }
            }
        } else {
            return ticks
        }
        return result
    }

    valToText (val) {
        const date = new Date(val)
        return shortMonths[date.getMonth()] + ' ' + date.getDate()
    }

    getMetrics () {
        return this.tickMetrics(0)
    }

    static getSize (metrics) {
        return defaults.padding * 2 + metrics.height
    }
}
