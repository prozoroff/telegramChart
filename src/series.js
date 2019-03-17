export class Series {
    constructor (xPoints, yPoints, name, color) {
        this.points = xPoints.map((a, i) => [xPoints[i], yPoints[i]])
        this.name = name
        this.color = color
    }
}
