// syntaxParser.js

var syntaxParser = codeTokens => {
	var res = [], deep = 0; 

	for (let i = 0; i < codeTokens.length; i++){
		let codeToken = codeTokens[i]
		  , { isCode, token } = codeToken; 

		if (isCode){
			if (token.todo === 'get' || token.todo === 'if'){
				deep = deep + 1; 
				if (deep === 1){
					let temp = syntaxParser(
						codeTokens.slice(i + 1)
					);
					temp.o = token; 
					res.push(temp); 
				}
			} else if (token.todo === 'teg' || token.todo === 'fi') {
				deep = deep - 1; 
				if (deep < 0) return res; 
			} else {
				if (deep === 0){
					res.push(codeToken); 
				}
			}
		} else {
			if (deep === 0){
				res.push(codeToken); 
			}
		}
	}

	return res; 
}

module.exports = syntaxParser; 
