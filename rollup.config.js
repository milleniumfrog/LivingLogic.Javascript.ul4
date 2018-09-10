const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const babel = require('rollup-plugin-babel');

export default {
    input: './dist/es2015/ul4.js',
    output: {
        file: './dist/browser/ul4.js',
        format: 'iife',
        name: 'ul4Lib',
        sourcemap: true
    },
    plugins: [
        uglify.uglify(),
        sourcemaps(),
        babel(
            {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "useBuiltIns": "entry"
                        }
                    ]
                ]
            }
        )
    ]
}