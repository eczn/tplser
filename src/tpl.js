// tpl.js
var fs = require('fs'); 
var EXP = /{{(.*?)}}/g; 
var tpl = {}; 
var tokenParser = require('./tokenParser'); 
var syntaxParser = require('./syntaxParser'); 
// Syntaxer: AST Evaluator 
var syntaxer = require('./syntaxer'); 

// CodeToken Parser 
var codeTokenGenerator = require('./codeTokenGenerator'); 

// Global 
var tplGlobal = require('./tplGlobal'); 

// Scopes
var tplScopesStack = [
	tplGlobal
]; 

// 创建、释放全局作用域 
tpl.push = data => tplScopesStack.push(data); 
tpl.pop = () => tplScopesStack.pop(); 

tpl.fromFile = (tplWhere, config = {}) => {
	if (config.noCache){
		// 不缓存
		return dataRaw => {
			var template = fs.readFileSync(tplWhere).toString(); 

			return tpl.fromStr(template, config)(dataRaw)
		}
	} else {
		// 缓存 
		var template = fs.readFileSync(tplWhere).toString(); 

		return tpl.fromStr(template, config); 		
	}
}

tpl.fromStr = (template, config = {}) => {
	if (config.compress){
		template = template.replace(/(\n|\r|\t)/g, ''); 
	}

	if (config.noSpace){
		template = template.replace(/}}(\s){{/g, ''); 
	}

	if (config.noCache){
		// 不缓存 
		return dataRaw => tpl.render(template, dataRaw)
	} else {
		// 缓存 
		var syntaxes = tpl.getSyntaxs(template); 

		return dataRaw => tpl.evalFromSyntaxes(syntaxes, dataRaw); 			
	}
}

tpl.getSyntaxs = template => {
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
	codeTokens.map(e => {
		if (e.isCode) {
			var temp = e.token.slice(2, -2).trim();
			e.token = tokenParser(temp); 
		}
	}); 

	codeTokens = codeTokens.filter(e => e.token !== ''); 

	return syntaxParser(codeTokens); 
}

tpl.render = (template, dataRaw) => {
	// Eval Sytax Array 
	return syntaxer(
		tpl.getSyntaxs(template),
		tplScopesStack.concat([ dataRaw ])
	); 
}

tpl.evalFromSyntaxes = (syntaxes, data) => {
	return syntaxer(
		syntaxes, 
		tplScopesStack.concat([
			data
		])
	); 
}

// Exports 
module.exports = tpl; 

