const IS_DEV = process.env.NODE_ENV==='development'
module.exports = {

    productionSourceMap: false,
    runtimeCompiler: IS_DEV,
    parallel: require('os').cpus().length > 1,
    // webpack 链式配置
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        //修复
        config.resolve.symlinks(true)
        if (!IS_DEV) {
            config.optimization.delete('splitChunks')

        }



        // 修复Lazy loading routes Error
        config.plugin('html').tap(args => {
            args[0].chunksSortMode = 'none'
            return args
        })
        return config;

    },
    configureWebpack: config => {

        config.optimization = {
            minimize:true,
            splitChunks: {
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    elementUI: {
                        name: 'chunk-elementUI',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                        chunks: 'all'
                    }
                }
            }
        };


    },


    css: {
        loaderOptions: {

            sass: {
               //全局引入
                data: `@import "@/common/styles/index.scss";`
            }
        }

    }
}
