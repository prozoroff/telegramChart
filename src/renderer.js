
const xmlns = 'http://www.w3.org/2000/svg'
const create = (tag, attrs) => {
    const el = document.createElementNS(xmlns, tag)
    if (attrs) {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key])
        }
    }
    return el
}

export const svg = attrs => create(
    'svg', attrs
)

export const path = attrs => create(
    'path', attrs
)
