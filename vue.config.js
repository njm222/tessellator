const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                filename:  '[path].gz[query]',
                test: /\.js$|\.css$|\.html$/,
                algorithm: 'gzip',
                minRatio: 0.8
            })
        ]
    }
}