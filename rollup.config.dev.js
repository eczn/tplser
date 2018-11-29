import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
// import serve from 'rollup-plugin-serve'; 
import html from 'rollup-plugin-fill-html';

export default [
    {
        input: 'src/core/index.ts',
        plugins: [
            // html({
            //     template: 'src/dev.html',
            //     filename: 'index.html'
            // }), 
            json(), 
            typescript(), 
            // serve('dist')
        ], 
        output: {
            file: 'dist/compile.dev.js', 
            format: 'cjs'
        }, 
        watch: {
            chokidar: true, 
            clearScreen: true, 
            include: 'src/**'
        }
    }
];
