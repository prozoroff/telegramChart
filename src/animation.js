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

const easeOut = (stepsCount, from, to) => ({
    step: 0,
    get val () {
        if (this.step === stepsCount) {
            return null
        }
        let time = this.step++ / stepsCount - 1
        return (to - from) * (time * time * time + 1) + from
    }
})

const easeIn = (stepsCount, from, to) => ({
    step: 0,
    get val () {
        if (this.step === stepsCount) {
            return null
        }
        let time = this.step++ / stepsCount
        return (to - from) * time * time * time + from
    }
})

const easeInOut = (stepsCount, from, to) => ({
    step: 0,
    get val () {
        if (this.step === stepsCount) {
            return null
        }
        let time = 2 * this.step++ / stepsCount

        if (time < 1) {
            return (to - from) / 2 * time * time + from
        }
        time -= 1
        return (from - to) / 2 * (time * (time - 2) - 1) + from
    }
})

export const animate = (series, toY, toScale) => {
    const fromY = series.translate[1]
    const fromScale = series.scale[1]

    const stepsCount = 20
    const yAnim = easeIn(stepsCount, fromY, toY)
    const scaleAnim = easeIn(stepsCount, fromScale, toScale)

    let stop
    const cancel = () => (stop = true)

    const render = () => {
        const yVal = yAnim.val
        const scaleVal = scaleAnim.val

        if (yVal !== null && !stop) {
            reqAnimFrame(render)
            series.translate[1] = yVal
            series.scale[1] = scaleVal
        }

        if (yVal === null) {
            series.translate[1] = toY
            series.scale[1] = toScale
        }

        series.setTransform()
    }
    render()
    return cancel
}
