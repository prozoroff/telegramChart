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
