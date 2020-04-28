const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                test: /\.js(\?.*)?$/i,
                algorithm: 'gzip',
            })
        ]
    }
}