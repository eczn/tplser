import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import rimraf from "rimraf";
import { uglify } from "rollup-plugin-uglify";


rimraf.sync('./dist');
rimraf.sync('./typings');

const tplserDist = {
    input: 'src/core/index.ts',
    plugins: [
        json(), 
        typescript({
            useTsconfigDeclarationDir: true
        }), 
        uglify()
    ], 
    output: {
        file: 'dist/tplser.dist.js', 
        format: 'cjs'
    }
}

const tplserUMD = {
    input: 'src/core/index.ts',
    plugins: [
        json(), 
        typescript({
            tsconfigOverride: { compilerOptions: { declaration: false } }
        }), 
        uglify()
    ], 
    output: {
        name: 'tplser', 
        file: 'dist/tplser.UMD.min.js', 
        format: 'umd'
    }
}

export default [
    tplserDist, 
    tplserUMD
];
