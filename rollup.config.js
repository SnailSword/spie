import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
    input: __dirname + '/src/main.js',
    plugins: [
        nodeResolve(),
        commonjs(),
        uglify.uglify(),
        babel({
            exclude: 'node_modules/**',
        })
    ],
    // sourceMap: true,
    output: [
        {
            format: 'umd',
            name: 'SPie',
            file: 'dist/spie.js'
        }
    ]
};