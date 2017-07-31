// sytaxer.js 
function _find(key, scopes){
	return scopes.reduce((target, cur) => {
		if (key in cur) {
			return cur[key]; 
		} else {
			return target; 
		}
	}, null); 
}

function find(keyStr, scopes){
	var keys = keyStr.split('.'); 
	
	var fir = _find(keys[0], scopes); 

	return keys.slice(1).reduce((acc, key) => {
		return acc[key]; 
	}, fir); 
}

var getEval = (syntaxs, scopes) => {
	// 创建作用域 
	var newScope = {}, list = find(syntaxs.o.list, scopes)

	// 压入作用域链 
	scopes.unshift(newScope); 

	var res = new Array(list.length).fill(0).map((_, idx) => {
		newScope[syntaxs.o.index] = idx; 
		newScope[syntaxs.o.item] = list[idx]; 

		// 求值 
		return sytaxer(syntaxs, scopes);
	}).join(''); 

	// 弹出作用域链 
	scopes.shift(); 

	return res; 
}


var ifEval = (syntaxs, scopes) => {
	var how2if = syntaxs.o; 
	var itTrue = renderEval(how2if.key, scopes); 
	var whereElse = syntaxs.reduce((acc, cur, idx) => {
		if (cur.token.todo === 'else'){
			return idx; 
		} else {
			return acc; 
		}
	}); 

	var temp; 

	if (itTrue) {
		temp = syntaxs.slice(0, whereElse); 
	} else {
		// 不包括 else 自己 
		temp = syntaxs.slice(whereElse + 1); 
	}

	// console.log(temp); 


	return sytaxer(temp, scopes); 
}

var renderEval = (key, scopes) => {
	var findInScopes = key => find(key, scopes); 
	var opt = find(key[0], scopes); 
	if (typeof opt === 'function'){
		return opt.apply(
			// 顶部作用域 
			scopes[0],
			// 参数表 
			key.slice(1).map(findInScopes)
		); 
	} else {
		return opt; 
	}
}


function sytaxer(syntaxs, scopes){
	// 求值 
	return syntaxs.reduce((acc, syntax) => {
		if (Array.isArray(syntax)){
			
			if (syntax.o.todo === 'get'){
				// get 语句  
				return acc + getEval(syntax, scopes); 
			} else {
				// if 语句 
				return acc + ifEval(syntax, scopes); 
			}
		} else {
			// 叶子 
			if (syntax.isCode) {
				// render 
				if (syntax.token.todo === 'render') {

					return acc + renderEval(syntax.token.key, scopes); 
				}
			} else {
				// Just Plain Text 
				return acc + syntax.token; 
			}
		}
	}, ''); 
}

module.exports = sytaxer; 
