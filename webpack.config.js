const path = require('path')
const ClosureCompilerPlugin = require('webpack-closure-compiler')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'chart.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new ClosureCompilerPlugin({
            compiler: {
                language_in: 'ECMASCRIPT6',
                language_out: 'ECMASCRIPT5',
                compilation_level: 'ADVANCED'
            },
            concurrency: 3
        })
    ]
}
