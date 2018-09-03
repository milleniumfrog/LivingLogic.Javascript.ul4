const uglify = require( 'rollup-plugin-uglify' );
const sourcemaps = require( 'rollup-plugin-sourcemaps' );
const resolve = require( 'rollup-plugin-node-resolve' );

export default {
    input: './dist/es2015/ul4.js',
    output: {
        file: './dist/browser/ul4.js',
        format: 'iife',
        name: 'ul4Lib',
        sourcemap: true
    },
    plugins: [
        resolve(),
        uglify.uglify(),
        sourcemaps()
    ]
}