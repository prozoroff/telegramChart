export const padBox = (box, padding) => {
    return {
        x: box.x + padding,
        y: box.y + padding,
        width: box.width - padding * 2,
        height: box.height - padding * 2
    }
}

export const extend = (dest, src) => {
    for (let key in src) {
        !dest[key] && (dest[key] = src[key])
    }
    return dest
}

export const extendCopy = (dest, src) => {
    return extend(extend({}, dest), src)
}

export const snap = (val, offset) => {
    let snapOffset = (offset || 0) - val % 1
    Math.abs(snapOffset) > 0.5 && (snapOffset -= snapOffset > 0 ? 1 : -1)
    return val + snapOffset
}

export const throttle = (func, ms) => {
    let isThrottled = false
    let savedArgs
    let savedThis
    let timeoutId

    const wrapper = function () {
        if (isThrottled) {
            savedArgs = arguments
            savedThis = this
            return
        }

        func.apply(this, arguments)
        isThrottled = true

        timeoutId = setTimeout(function () {
            isThrottled = false
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = savedThis = null
            }
        }, ms)
    }

    // wrapper.__proto__.cancel = function () {
    //     clearTimeout(timeoutId)
    // }

    return wrapper
}
