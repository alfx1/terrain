const path = require('path')


module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 4200,
        open: true,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: './'
        }
    },
}
