import { Value } from "./TokenType"; 

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
