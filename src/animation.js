const reqAnimFrame = window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.webkitRequestAnimationFrame

const startFraction = 1 / 10
const deltaFraction = startFraction / 20

export const animate = (series, toY, toScale) => {
    let fraction = startFraction
    const fromY = series.translate[1]
    const fromScale = series.scale[1]

    const done = () => toY - fromY > 0
        ? series.translate[1] >= toY
        : series.translate[1] <= toY

    let stop
    const cancel = () => (stop = true)

    const render = () => {
        if (!stop) {
            reqAnimFrame(render)
        }
        series.translate[1] += fraction * (toY - fromY)
        series.scale[1] += fraction * (toScale - fromScale)
        fraction -= deltaFraction

        if (done()) {
            series.translate[1] = toY
            series.scale[1] = toScale
            stop = true
        }

        series.setTransform()
    }
    render()
    return cancel
}
