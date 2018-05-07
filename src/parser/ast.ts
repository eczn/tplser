import { Statement } from './high-light'; 

export interface AST {
    stms: (Statement | AST)[]
}

/**
 * 从 tpl, Statements 中生成 AST 
 * @param tpl 
 * @param stms 
 * @returns 语法树 AST 
 */
function getAst(stms: Statement[], end: string = '') {
    let deep = 0; 
    for (let i = 0; i < stms.length; i ++) {
        let stm = stms[i]; 

        if (stm.todo === 'get') {
            
        } else if (stm.todo === end) {
            
        }
    }
}

function _getAst(ast: AST) {

}

export { getAst }
