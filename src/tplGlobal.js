// tplGlobal
var tplGlobal = {
	// 实数
	"+": (a, b) => a + b, 
	"-": (a, b) => a - b, 
	"/": (a, b) => a / b, 
	"*": (a, b) => a * b,

	// 比较
	">": (a, b) => a > b, 
	"<": (a, b) => a < b, 
	">=": (a, b) => a >= b, 
	"<=": (a, b) => a <= b, 
	"==": (a, b) => a == b, 
	"===": (a, b) => a === b, 

	// 逻辑 
	"&": (a, b) => a & b, 
	"|": (a, b) => a | b, 
	"~": a => ~a, 
	"!": a => !a, 

	// 谓词 
	"&&": (a, b) => a && b, 
	"||": (a, b) => a || b, 

	// 字符串 / 数组相关 
	"toLowerCase": a => a.toLowerCase(), 
	"toUpperCase": a => a.toUpperCase(), 
	"split": (str, sep) => str.split(sep), 
	"join": (arr, sep) => arr.join(sep),
	"trim": str => str.trim(), 

	// 取得属性 
	getPropertyOf: function(){
		let args = Array.from(arguments); 

		let main = args[0]; 
		let names = args.slice(1); 

		return names.reduce((acc, name) => {
			return acc[name]; 
		}, main); 
	}, 
	// let 定义变量别名  
	let: function(){
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
	}
}; 

module.exports = tplGlobal; 
