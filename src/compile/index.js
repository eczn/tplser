const getSyntax = require('./get-syntax')
    , tplEval = require('../runner/tpl-eval')

module.exports = compile; 

function compile(tpl) {
    let syntaxs = getSyntax(tpl); 

    return data => tplEval(syntaxs, data); 
}


