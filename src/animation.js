const reqAnimFrame = window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.webkitRequestAnimationFrame

const linear = (stepsCount, from, to) => ({
    step: 0,
    get val () {
        if (this.step === stepsCount) {
            return null
        }
        let time = this.step++ / stepsCount
        return (to - from) * time + from
    }
})

// const easeOut = (stepsCount, from, to) => ({
//     step: 0,
//     get val () {
//         if (this.step === stepsCount) {
//             return null
//         }
//         let time = this.step++ / stepsCount - 1
//         return (to - from) * (time * time * time + 1) + from
//     }
// })

// const easeIn = (stepsCount, from, to) => ({
//     step: 0,
//     get val () {
//         if (this.step === stepsCount) {
//             return null
//         }
//         let time = this.step++ / stepsCount
//         return (to - from) * time * time * time + from
//     }
// })

// const easeInOut = (stepsCount, from, to) => ({
//     step: 0,
//     get val () {
//         if (this.step === stepsCount) {
//             return null
//         }
//         let time = 2 * this.step++ / stepsCount

//         if (time < 1) {
//             return (to - from) / 2 * time * time + from
//         }
//         time -= 1
//         return (from - to) / 2 * (time * (time - 2) - 1) + from
//     }
// })

export const animateLegendIcon = (icon) => {
    const stepsCount = 10
    const opacityAnimOut = linear(stepsCount, 0, 1)

    const render = () => {
        const opacityValOut = opacityAnimOut.val

        if (opacityValOut !== null) {
            reqAnimFrame(render)
            icon.setAttribute('opacity', opacityValOut)
        }
    }
    render()
}

export const animateTickOut = (tick, move) => {
    const stepsCount = 10
    const xAnimOut = linear(stepsCount, 0, move)
    const opacityAnimOut = linear(stepsCount, 0.5, 0)

    const render = () => {
        const xValOut = xAnimOut.val
        const opacityValOut = opacityAnimOut.val

        if (xValOut !== null) {
            reqAnimFrame(render)
            tick.setAttribute('transform', 'translate(' + xValOut + ',0)')
            tick.setAttribute('opacity', opacityValOut)
        }

        if (xValOut === null) {
            tick.parentNode.removeChild(tick)
        }
    }
    render()
}

export const animateTickIn = (tick, move) => {
    const stepsCount = 10
    const xAnimOut = linear(stepsCount, move, 0)
    const opacityAnimOut = linear(stepsCount, 0, 1)

    const render = () => {
        const xValOut = xAnimOut.val
        const opacityValOut = opacityAnimOut.val

        if (xValOut !== null) {
            reqAnimFrame(render)
            tick.setAttribute('transform', 'translate(' + move + ',0)')
            tick.setAttribute('opacity', opacityValOut)
        }

        if (xValOut === null) {
            tick.setAttribute('opacity', 1)
        }
    }
    render()
}

export const animateYTicks = (groupOut, groupIn, move) => {
    const stepsCount = 20

    const yAnimIn = linear(stepsCount, move, 0)
    const yAnimOut = linear(stepsCount, 0, -move)
    const opacityAnimIn = linear(stepsCount, 0, 1)
    const opacityAnimOut = linear(stepsCount, 1, 0)

    const render = () => {
        const yValIn = yAnimIn.val
        const yValOut = yAnimOut.val
        const opacityValIn = opacityAnimIn.val
        const opacityValOut = opacityAnimOut.val

        if (yValIn !== null) {
            reqAnimFrame(render)
            groupIn.setAttribute('transform', 'translate(0,' + yValIn + ')')
            groupIn.setAttribute('opacity', opacityValIn)

            if (groupOut) {
                groupOut.setAttribute('transform', 'translate(0,' + yValOut + ')')
                groupOut.setAttribute('opacity', opacityValOut)
            }
        }

        if (yValIn === null) {
            groupOut && groupOut.parentNode.removeChild(groupOut)
            groupIn.setAttribute('transform', 'translate(0,0)')
            groupIn.setAttribute('opacity', 1)
            animateYTicks.busy = false
        }
    }
    animateYTicks.busy = true
    render()
}

export const animateSeries = (series, toY, toScale) => {
    const fromY = series.translate[1]
    const fromScale = series.scale[1]

    const stepsCount = 20
    const yAnim = linear(stepsCount, fromY, toY)
    const scaleAnim = linear(stepsCount, fromScale, toScale)

    let opacityAnimIn
    if (series.toFade) {
        opacityAnimIn = linear(stepsCount,
            series.visible ? 0 : 1,
            series.visible ? 1 : 0)
    }

    let stop
    const cancel = () => (stop = true)

    const render = () => {
        const yVal = yAnim.val
        const scaleVal = scaleAnim.val

        if (yVal !== null && !stop) {
            reqAnimFrame(render)
            series.translate[1] = yVal
            series.scale[1] = scaleVal

            if (series.toFade) {
                series.opacity = opacityAnimIn.val
            }
        }

        if (yVal === null) {
            series.translate[1] = toY
            series.scale[1] = toScale
            series.opacity = series.visible ? 1 : 0
            series.toFade = false
        }

        series.setTransform()
    }
    render()
    return cancel
}
