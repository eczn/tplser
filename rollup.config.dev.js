import typescript from 'rollup-plugin-typescript2';
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
            typescript({
                tsconfig: 'tsconfig.json', 
                tsconfigOverride: { compilerOptions: { declaration: false } }
            }), 
            // serve('dist')
        ], 
        output: {
            file: 'dev/compile.dev.js', 
            format: 'cjs'
        }, 
        watch: {
            chokidar: true, 
            clearScreen: true, 
            include: 'src/**'
        }
    }
];
