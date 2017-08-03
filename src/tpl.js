// tpl.js
var fs = require('fs'); 
var EXP = /{{(.*?)}}/g; 
var tpl = {}; 
var tokenParser = require('./tokenParser'); 
var syntaxParser = require('./syntaxParser'); 
var syntaxer = require('./syntaxer'); 
var codeTokenGenerator = require('./codeTokenGenerator'); 

var tplScopesStack = []; 

// 创建、释放全局作用域 
tpl.push = data => tplScopesStack.push(data); 
tpl.pop = () => tplScopesStack.pop(); 

tpl.fromFile = (tplWhere, config = {}) => {
	var template = fs.readFileSync(tplWhere).toString(); 

	return tpl.fromStr(template, config); 
}

tpl.fromStr = (template, config = {}) => {
	if (config.compress){
		template = template.replace(/(\n|\r|\t)/g, ''); 
	}

	return dataRaw => tpl.render(template, dataRaw); 
}

tpl.render = (template, dataRaw) => {
	var statements = []; 

	template.replace(EXP, (match, p1, offset) => {
		statements.push({
			token: match, 
			offset: offset
		}); 
		// return dataRaw[p1.trim()]; 
	}); 
	
	var codeTokens = codeTokenGenerator(statements, template); 

	// 解析 
	codeTokens.forEach(e => {
		if (e.isCode) {
			var temp = e.token.slice(2, -2).trim();
			e.token = tokenParser(temp); 
		}
	}); 

	// codeTokens.forEach(e => console.log(e))
	
	// var d = syntaxParser(codeTokens)
	// d.forEach(e => console.log(e)); 
	
	// Eval Sytax Array 
	return syntaxer(
		syntaxParser(codeTokens),
		tplScopesStack.concat([ dataRaw ])
	); 
}

// Exports 
module.exports = tpl; 

