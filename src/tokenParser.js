// tokenParser

var parseToArr = str => str.split('\t').join(' ').split('').reduce((acc, cur) => {
	if (cur === ','){
		return acc; 
	}
	if (cur === '(' || cur === '['){
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
}, []).join('').split(' ').map(ch => {
	if (!Number.isNaN(parseInt(ch))){
		return parseInt(ch); 
	} else {
		return ch; 
	}
}).filter(e => e !== '' && e!== '\n'); 


module.exports = token => {
	var halfTokens = parseToArr(token); 

	var temp; 


	if (halfTokens[0] === 'get'){
		temp = {
			todo: 'get', 
			key: halfTokens[0], 
			item: halfTokens[2], 
			index: halfTokens[3], 
			list: halfTokens[halfTokens.length-1]
		}
	} else if (halfTokens[0] === 'teg') {
		temp = {
			todo: 'teg'
		}
	} else if (halfTokens[0] === 'if'){
		temp = {
			todo: 'if', 
			key: halfTokens.slice(1)
		}
	} else if (halfTokens[0] === 'else'){
		temp = {
			todo: 'else'
		}
	} else if (halfTokens[0] === 'fi'){
		temp = {
			todo: 'fi'
		}
	} else {
		temp = {
			todo: 'render', 
			key: halfTokens
		}
	}
	return temp; 
}