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
var renders = {}; 

function getFileName(file){
	// tplWhere
	var pos = file.indexOf('/'); 

	if (pos === -1){
		pos = file.indexOf('\\'); 
	}

	if (pos === -1) {
		return file
	} else {
		return file.slice(pos + 1); 
	}
}

// Scopes
var tplScopesStack = [
	tplGlobal, 
	renders
]; 

// 创建、释放全局作用域 
tpl.push = data => tplScopesStack.push(data); 
tpl.pop = () => tplScopesStack.pop(); 

tpl.fromFile = (tplWhere, config = {}) => {
	var fileName = getFileName(tplWhere); 

	if (config.noCache){
		// 不缓存
		return dataRaw => {
			var template = fs.readFileSync(tplWhere).toString(); 

			return tpl.fromStr(template, config)(dataRaw)
		}
	} else {
		// 缓存 
		var template = fs.readFileSync(tplWhere).toString(); 

		var render = tpl.fromStr(template, config); 
		
		renders[fileName] = render; 

		return render; 
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
		return dataRaw => tpl.render(template, dataRaw, config)
	} else {
		// 缓存 
		var syntaxes = tpl.getSyntaxs(template); 

		return dataRaw => tpl.evalFromSyntaxes(syntaxes, dataRaw, config); 			
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

	// console.log('!!'); 
	// console.log(JSON.stringify(codeTokens)); 

	codeTokens = codeTokens.filter(e => e.token !== ''); 

	return syntaxParser(codeTokens); 
}

tpl.render = (template, dataRaw, config = {}) => {
	// Eval Sytax Array 
	return syntaxer(
		tpl.getSyntaxs(template),
		tplScopesStack.concat([
			dataRaw,
			config
		])
	); 
}

tpl.evalFromSyntaxes = (syntaxes, dataRaw, config = {}) => {
	return syntaxer(
		syntaxes, 
		tplScopesStack.concat([
			dataRaw, 
			config
		])
	); 
}

// Exports 
module.exports = tpl; 

