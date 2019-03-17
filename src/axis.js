
export class Axis {
    constructor (type, range) {
        this.type = type
        this.range = range
    }

    valToPos (val) {
        const range = this.range
        return (val - range[0]) / (range[1] - range[0])
    }
}
