// vue.config.js
module.exports = {
    // publicPath: 'GoQuickecomms/',
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => ({
                ...options,
                compilerOptions: {
                    // treat any tag that starts with trix- as custom elements
                    isCustomElement: tag => tag.includes('trix-')
                }
            }))
    }
}