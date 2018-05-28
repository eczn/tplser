// codeTokenGenerator.js
const tokenParser = require('./tokenParser')
	, getStatements = require('./get-statements')

module.exports = codeTokenGenerator; 

function codeTokenGenerator(template) {
	let statements = getStatements(template); 

	return statements.reduce((acc, stat, idx, its) => {
		if (idx === 0){
			acc.push({
				isCode: false, 
				token: template.slice(0, stat.offset)
			})
		} else {
			acc.push({
				isCode: false, 
				token: template.slice(
					its[idx - 1].offset + its[idx - 1].token.length,
					stat.offset
				)
			})
		}

		acc.push({
			isCode: true, 
			token: tokenParser(
				stat.token.slice(2, -2).trim()
			)
		}); 

		return acc; 
	}, []).concat([
		// 上面那个 reduce 会漏掉最后一个 在这里补上 
		{
			isCode: false, 
			token: template.slice(
				statements[statements.length - 1].offset + statements[statements.length - 1].token.length
			)
		}
	]).filter(e => e.token !== ''); 
}
