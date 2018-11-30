export type Value = (number | string); 

export type StringToken = string;

export type GetToken = {
	todo: 'get', 
	args: Value[], 
	inner: Token[]
}

export type IfToken = {
	todo: 'if', 
	args: Value[], 
	inner: Token[]
}

export type RenderToken = {
	todo: 'render', 
	args: Value[]
}

export type EndToken = {
	todo: 'fi' | 'teg' | 'else'
}

export type Token = StringToken | GetToken | IfToken | RenderToken | EndToken


/**
 * 吧输入处理为数组: '123 asd' => parseToArr => [123, 'asd']
 * @param str 
 */
export function parseToArr(str: string): Value[] {
	return str.split('\t').join(' ').split('').reduce((acc, cur) => {
		if (cur === ',') {
			// 把逗号当成空格处理
			acc.push(' '); 
			return acc; 
		}
		if (cur === '(' || cur === '[') {
			acc.push(' '); 
			acc.push(cur); 
			acc.push(' '); 
			return acc;
		} else if (cur === ')' || cur === ']') {
			acc.push(' '); 
			acc.push(cur); 
			acc.push(' '); 
		} else {
			acc.push(cur); 
		}
	
		return acc; 
	}, [] as string[]).join('').split(' ').map(ch => {
		if (!Number.isNaN(parseInt(ch))){
			return parseInt(ch); 
		} else {
			return ch; 
		}
	}).filter(e => e !== '' && e!== '\n'); 
}


/**
 * 
 * @param token 
 */
export function tokenParser(token: string) {
	const halfTokens = parseToArr(token); 

	let temp: Token; 

	if (halfTokens[0] === 'get'){
		let item, idx; 

		if (halfTokens.length <= 3) {
			item = '$item'
			idx = '$index'; 
		} else {
			if (halfTokens[1] === '(') {
				item = halfTokens[2]; 
				if (halfTokens[3] === ')') {
					idx = '$index'; 
				} else {
					idx = halfTokens[3]; 
				}
			} else {
				item = halfTokens[1]; 
				idx = '$index'; 
			}
		}

		temp = {
			todo: 'get',
			args: [item, idx, halfTokens[halfTokens.length-1]], 
			inner: []
		}
	} else if (halfTokens[0] === 'teg') {
		temp = {
			todo: 'teg'
		}
	} else if (halfTokens[0] === 'if') {
		temp = {
			todo: 'if', 
			args: halfTokens.slice(1), 
			inner: []
		}
	} else if (halfTokens[0] === 'else') {
		temp = {
			todo: 'else'
		}
	} else if (halfTokens[0] === 'fi') {
		temp = {
			todo: 'fi'
		}
	} else {
		temp = {
			todo: 'render', 
			args: halfTokens
		}
	}

	return temp; 
}

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
