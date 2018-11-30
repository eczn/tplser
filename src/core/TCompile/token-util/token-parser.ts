import { Token } from "./TokenType"; 
import { parseToArr } from "./parse-to-arr"; 

/**
 * 处理形如 {{ for (item, idx) >>> list }} 的语句
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
