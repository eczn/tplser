const chokidar = require('chokidar')
    , Scope = require('./Scope')
    , compile = require('./compile')
    , fs = require('fs')
    , tplser = {}

module.exports = tplser; 

tplser.compile = compile; 

/**
 * 监听文件, 实时更新 render 
 * @param { String } file_path 模板路径
 * @param { Object } compile_opt 可省略 *
 * @param { Function } cb 回调，可提前作为第二个参数 
 */
tplser.watchFile = function(file_path, compile_opt, cb) {
    if (typeof compile_opt === 'function') {
        cb = compile_opt; 
        compile_opt = {}; 
    }
    
    let watcher = chokidar.watch(file_path); 

    function onChange() {
        let tpl = fs.readFileSync(file_path, 'utf-8'); 
        let render = compile(tpl, compile_opt); 

        cb && cb(render); 
    }

    watcher.on('change', onChange); 
    onChange(); 

    return watcher; 
}


