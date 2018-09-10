const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');

export default [{
    input: './dist/tmp/ul4.js',
    output: {
        file: './dist/browser/ul4.js',
        format: 'iife',
		name: 'ul4Lib',
		sourcemap: true,
    },
    plugins: [
		sourcemaps(),
		uglify.uglify(),
	]
},
{
    input: './dist/tmp/ul4.js',
    output: {
        file: './dist/umd/ul4.js',
        format: 'umd',
		name: 'ul4Lib',
		sourcemap: true,
    },
    plugins: [
		sourcemaps(),
		uglify.uglify(),
	]
}

]