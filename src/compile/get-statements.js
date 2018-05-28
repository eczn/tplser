const EXP = /{{(.*?)}}/g; 

module.exports = getStatements; 

/**
 * 获取 statement 
 * @param { String } str 模板
 * @returns { Array<{ token: String, offset: Number }> } 
 */
function getStatements(str) {
    let statements = [];

    str.replace(EXP, (match, p1, offset) => {
		statements.push({
			token: match, 
			offset: offset
		}); 
    }); 
    
    return statements; 
}

