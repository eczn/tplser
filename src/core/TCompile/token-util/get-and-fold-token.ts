import { Token } from "./TokenType"; 

import { tokenParser } from "./token-parser"; 

const EXP = /{{(.*?)}}/g; 

/**
 * 获取 token 
 * @param { String } str 模板
 */
export function getToken(str: string): Token[] {
    const statements: Token[] = [];
    let p = 0; 

	// 寻找 {{ }}
    str.replace(EXP, (match: string, __: any, offset: number) => {
		// 普通字符串
        statements.push(str.substring(p, offset)); 

		// 标记 
        const code = match.slice(2, -2).trim(); 
		statements.push(tokenParser(code)); 

		p = offset + match.length; 

        return ''; 
	}); 

	// p == 0 则说明模版中不存在 {{ }} 标记, 直接返回字符串作为 token 即可
	return p === 0 ?
		[ str ] :
		statements; 
}

/**
 * 折叠闭合 token 
 * @param tokens 
 */
export function tokenFold(tokens: Token[]): Token[] {
	const res = []; 
	let deep = 0; 

	for (let i = 0; i < tokens.length; i++){
		const token = tokens[i]

		if (typeof token != 'string') {
			if (token.todo === 'get' || token.todo === 'if'){
				deep = deep + 1; 
				if (deep === 1) {
                    // Recursive 
					let temp = tokenFold(
						tokens.slice(i + 1)
					);
                    // temp.o = stat; 
                    token.inner = temp; 
					res.push(token); 
				}
			} else if (token.todo === 'teg' || token.todo === 'fi') {
				deep = deep - 1; 
				if (deep < 0) return res; 
			} else {
				if (deep === 0){
					res.push(token); 
				}
			}
		} else {
			if (deep === 0) {
				res.push(token); 
			}
		}
	}

	return res; 
}
