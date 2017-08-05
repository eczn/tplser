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
	"trim": str => str.trim()
}; 

module.exports = tplGlobal; 
