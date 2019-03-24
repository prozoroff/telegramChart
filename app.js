/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

var chartData
var mode = 'day'
var switchEl = document.getElementById('switch')
var switchElements = document.getElementsByClassName('chart')
switchEl.onclick = function () {
    var prevMode = mode
    mode = mode === 'day' ? 'night' : 'day'
    document.body.style.background = mode === 'day' ? 'white' : '#000018'
    switchEl.innerHTML = 'Switch to ' + capitalizeFirstLetter(prevMode) + ' Mode'
    switchEl.style.color = mode === 'day' ? '#333333' : '#eeeeee'
    createCharts(chartData, mode)
}

function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function createCharts (data, mode) {
    chartData = data
    for (var i = 0, l = switchElements.length; i < l; i++){
        var chartEl = switchElements[i]
        chartData[i].width = Math.min(screen.width, 600)
        chartEl.firstChild && chartEl.removeChild(chartEl.firstChild)
        new tgc.Chart(chartEl, chartData[i], mode)
    }
}

fetch('chart_data.json').then(res => {
    return res.json()
}).then(data => {
    createCharts(data)
})
