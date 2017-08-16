// tokenParser

var parseToArr = str => str.split('\t').join(' ').split('').reduce((acc, cur) => {
	if (cur === ','){
		// 把逗号当成空格处理
		acc.push(' '); 
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
		let item, idx; 

		if (halfTokens.length <= 3){
			item = '$item'
			idx = '$index'; 
		} else {
			if (halfTokens[1] === '('){
				item = halfTokens[2]; 
				if (halfTokens[3] === ')'){
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
			key: halfTokens[0], 
			// itme 或者 index 可能缺省 
			item: item,
			index: idx,
			// 最后一个是数组  
			list: halfTokens[halfTokens.length-1]
		}

		// console.log(halfTokens)
		// console.log(temp); 
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