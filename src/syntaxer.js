// sytaxer.js 
const STR_EXP = /'(.*?)'/g; 

// 作用域链寻找变量 
function find(keyStr, scopes){
	var keys = keyStr.split('.')
	  , key = keys[0]
	  , fir = null;

	if (key.startsWith("'")){
		return key.slice(1); 
	}

	// For Performance 
	for (let i = 0; i < scopes.length; i ++){
		let now = scopes[i]; 
		if (key in now){
			fir = now[key]; 
			break;
		}
	}

	return keys.slice(1).reduce((acc, key) => {
		return acc[key]; 
	}, fir); 
}

// get 求值 
var getEval = (syntaxs, scopes) => {
	// 创建作用域 
	var newScope = {}, list = find(syntaxs.o.list, scopes)

	// 压入作用域链 
	scopes.unshift(newScope); 

	var res = ''; 
	for (let idx = 0; idx < list.length; idx ++) {
		newScope[syntaxs.o.index] = idx; 
		newScope[syntaxs.o.item] = list[idx]; 
		
		res += sytaxer(syntaxs, scopes)
	}

	// 弹出作用域链 
	scopes.shift(); 

	return res; 
}

// if 求值 
var ifEval = (syntaxs, scopes) => {
	var how2if = syntaxs.o; 
	var ifCondition = renderEval(how2if.key, scopes); 

	// 取得 else 从句的位置 没有 else 则为 -1 
	var whereElse = syntaxs.reduce((acc, cur, idx) => {
		if (cur.token.todo === 'else'){
			return idx; 
		} else {
			return acc; 
		}
	}, -1); 

	var temp; 

	if (ifCondition) {
		if (~whereElse) {
		// Has Else 
			temp = syntaxs.slice(0, whereElse);
		} else {
		// No Else 
			temp = syntaxs; 
		}
	} else {
		// 不包括 else 自己 
		temp = syntaxs.slice(whereElse + 1); 
	}

	return sytaxer(temp, scopes); 
}

// 值渲染 函数处理  
var renderEval = (key, scopes) => {
	var findInScopes = key => find(key, scopes); 
	var opt = find(key[0], scopes); 
	if (typeof opt === 'function'){
		return opt.apply(
			// 顶部作用域 
			scopes[scopes.length - 1],
			// 参数表 
			key.slice(1).map(findInScopes)
		); 
	} else {
		return opt; 
	}
}


function sytaxer(syntaxs, scopes){
	// 作用域 this 
	let scopesTop = scopes[scopes.length - 1]; 
	scopesTop.this = scopesTop; 

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
