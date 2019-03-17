/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

fetch('chart_data.json').then(res => {
    return res.json()
}).then(data => {
    new tgc.Chart(document.getElementById('chart'), data[0]).render()
})
