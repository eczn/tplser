import * as chokidar from "chokidar"; 
import * as fs from "fs"; 
import { compile } from "src/core";

export function watchFile(
    file_path: string,
    compile_opt: object | Function,
    cb: Function
) {
    if (typeof compile_opt === 'function') {
        cb = compile_opt; 
        compile_opt = {}; 
    }
    
    const watcher = chokidar.watch(file_path); 

    function onChange() {
        const tpl = fs.readFileSync(file_path, 'utf-8'); 
        const render = compile(tpl, compile_opt); 

        cb && cb(render); 
    }

    watcher.on('change', onChange); 
    onChange(); 

    return watcher; 
}
