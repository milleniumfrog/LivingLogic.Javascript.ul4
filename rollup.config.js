const uglify = require( 'rollup-plugin-uglify' );

export default {
    input: './dist/es2015/ul4.js',
    output: {
        file: './dist/browser/ul4.js',
        format: 'iife',
        name: 'ul4Lib',
        sourcemap: true
    },
    plugins: [
        uglify.uglify()]
}