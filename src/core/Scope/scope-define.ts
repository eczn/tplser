// tplGlobal
export const tplGlobal = {
	// 实数
	"+": (a: number, b: number) => a + b, 
	"-": (a: number, b: number) => a - b, 
	"/": (a: number, b: number) => a / b, 
	"*": (a: number, b: number) => a * b,

	// 比较
	">": (a: number, b: number) => a > b, 
	"<": (a: number, b: number) => a < b, 
	">=": (a: number, b: number) => a >= b, 
	"<=": (a: number, b: number) => a <= b, 
	"==": (a: number, b: number) => a == b, 
	"===": (a: number, b: number) => a === b, 

	// 逻辑 
	"&": (a: number, b: number) => a & b, 
	"|": (a: number, b: number) => a | b, 
	"~": (a: number) => ~a, 
	"!": (a: number) => !a, 

	// 谓词 
	"&&": (a: boolean, b: boolean) => a && b, 
	"||": (a: boolean, b: boolean) => a || b, 

	// 字符串 / 数组相关 
	"toLowerCase": (a: string) => a.toLowerCase(), 
	"toUpperCase": (a: string) => a.toUpperCase(), 
	"split": (str: string, sep: string) => str.split(sep), 
	"join": (arr: Array<any>, sep: string) => arr.join(sep),
	"trim": (str: string) => str.trim(), 

	// 取得属性 
	getPropertyOf() {
		let args = Array.from(arguments); 

		let main = args[0]; 
		let names = args.slice(1); 

		return names.reduce((acc, name) => {
			return acc[name]; 
		}, main); 
	}, 
	
	// let 定义变量别名  
	let() {
		let args = Array.from(arguments);
		let key = args[0]; 
		let values = args.slice(1); 
		let first = values[0]; 

		if (typeof first === 'function'){
			this[key] = first.apply(
				this,
				values.slice(1)
			); 
		} else {
			this[key] = first; 
		}

		return ''; 
	}, 

	// 对象转 JSON 
	toJSON(o: object) {
		return JSON.stringify(o); 
	}, 

	keysFor(o: object) {
		return Object.keys(o); 
	}
}; 
