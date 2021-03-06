// syntaxer.js 
// const Scope = require('../Scope')
import { global_scope, Scope } from "../Scope";
import { Token, GetToken, RenderToken, IfToken } from "../TCompile"; 
// const STR_EXP = /'(.*?)'/g; 


/**
 * 处理 get token 
 * @param token 
 * @param scope 
 */
function getEval(token: GetToken, scope: Scope): string {
	const { args, inner } = token; 

	const list = scope.find(args[2]); 
	
	let res = ''; 

	for (let i = 0; i < list.length; i ++) {
		const [item, idx] = args; 

		const newScope = scope.extend({
			[item]: list[i], 
			[idx]: i, 
		}); 

		res += runner(inner, newScope); 
	}

	return res; 
}

/**
 * 处理 if token 
 * @param token 
 * @param scope 
 */
function ifEval(token: IfToken, scope: Scope): string {
	const ifCondition = renderEval(token, scope); 

	// 取得 else 从句的位置 没有 else 则为 -1 
	let whereElse = token.inner.length; 

	token.inner.forEach((it, i) => {
		if (typeof it !== 'string' && it.todo === 'else') {
			whereElse = i; 
		}
	}); 

	const theInner = ifCondition ? (
		token.inner.slice(0, whereElse)
	) : (
		token.inner.slice(whereElse + 1)
	); 

	return runner(theInner, scope); 
}

/**
 * 处理 render token 
 * @param token 
 * @param scope 
 */
function renderEval(token: RenderToken | IfToken, scope: Scope) {
	const [opt, ...restVals] = token.args.map(e => scope.find(e)); 

	if (typeof opt === 'function'){
		return opt.apply(
			scope.vars,  // 顶部作用域 
			restVals     // 参数表 
		); 
	} else {
		return opt; 
	}
}

/**
 * 遍历 token 
 * @param tokens 
 * @param scope 
 */
function runner(tokens: Token[], scope: Scope) {
	return tokens.reduce((acc, token) => {
		// console.log(token)
		if (typeof token === 'string'){
			return acc + token; 
		} else {
			if (token.todo === 'render') {
				if (!token.args) {
					console.log('Error When Processing:', token); 
					return 'Error'; 
				}

				return acc + renderEval(token, scope); 
			} else if (token.todo === 'get') {
				if (!token.inner) {
					console.log('Error When Processing:', token); 
					return 'Error'; 
				}

				return acc + getEval(token, scope);  
			} else if (token.todo === 'if') {
				if (!token.inner) {
					console.log('Error When Processing:', token); 
					return 'Error'
				}

				return acc + ifEval(token, scope); 
			}
		}
	}, ''); 
}

/**
 * tpl 虚拟机 
 * @param tokens 
 * @param addtional_scope 
 */
export function tplEval(tokens: Token[], addtional_scope: object) {
	let eval_scope = global_scope.extend(addtional_scope); 

	return runner(tokens, eval_scope); 
}
