
export interface Statement {
    todo: string, 
    param: string[]
}

const map = {
    get: true, if: true, 
    teg: true, fi: true, 
    render: true
}

/**
 * 将 tpl 高亮，标出语法点, 取得 Statement 
 * @param tpl 模板 
 * @returns 返回 Statement[] 
 */
function highLight(tpl: string): Statement[] {
    let statements:Statement[] = []; 
    let temp = ''; 

    for (let i = 0; i < tpl.length; i++) {
        let now = tpl[i]; 
        let next = tpl[i + 1] || ''; 

        if (now === '{' && next === '{') {
            // 命中 
            statements.push({
                todo: 'render', 
                param: [temp]
            }); 
            temp = ''; 

            let j = i;
            for (; j < tpl.length; j ++) {
                let now = tpl[j];
                let next = tpl[j + 1] || ''; 

                if (now === '}' && next === '}') {
                    break; 
                }
            }
            
            let code = tpl.substring(i + 2, j).trim(); 
            let [todo, ...param] = code.split(' '); 

            if (map[todo]){
                statements.push({
                    todo, param
                });
            } else {
                statements.push({
                    todo: 'eval',
                    param: [todo, ...param]
                });
            }
            

            // 跳过对应的 code 
            i += j - i + 1;  
        } else {
            // 积累 
            temp = temp + now; 
        }
    }

    return statements; 
}

export { highLight }
