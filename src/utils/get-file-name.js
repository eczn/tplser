// Exports 
module.exports = getFileName; 

/**
 * 从给定的 path 里获取文件名 
 * @param { String } file 
 * @returns { String } 返回文件名 
 */
function getFileName(file) {
	// tplWhere
	var pos = file.lastIndexOf('/'); 

	if (pos === -1){
		pos = file.lastIndexOf('\\'); 
	}

	if (pos === -1) {
		return file.slice(0, file.indexOf('.'));
	} else {
		var n = file.slice(pos + 1); 
		return n.slice(0, n.indexOf('.'));
	}
}
