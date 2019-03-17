export const padBox = (box, padding) => {
    return {
        x: box.x + padding,
        y: box.y + padding,
        width: box.width - padding * 2,
        height: box.height - padding * 2
    }
}
