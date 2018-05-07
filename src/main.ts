import { highLight, Statement } from './parser/high-light'; 
import { getAst } from './parser/ast'; 

const EXP = /{{(.*?)}}/g; 


class Tplser {
    tpl: string; 

    constructor(tpl: string) {
        this.tpl = tpl; 

        let statements = highLight(tpl); 
        // console.log(statements); 

        let ast = getAst(statements); 
        console.log(ast); 

    }
}

let engine = new Tplser(`
    嗯 。。。 
    {{ hello, world }} 

    do you know how to compile ?

    {{ get (e, idx) >>>> item }}
        {{ get (e2, idx2) >>>> item }}
            {{ e }}: {{ e2 }}
        {{ teg }}
    {{ teg }}
    the end 

    {{ (+ 1 2 3) }}
`); 











