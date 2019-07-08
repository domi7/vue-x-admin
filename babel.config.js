
const config  = {
    presets: [
        ['@vue/app',
            {"useBuiltIns": "entry"}
        ],


        ['@babel/preset-env',
            {
                'modules': false
            }
        ]
    ],
    plugins: [
        [
            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }
        ]

    ]
}
if (!['development'].includes(process.env.NODE_ENV)) {
    config.plugins.push(["transform-remove-console"])
}
module.exports =config;
