import { getToken, tokenFold } from "./token-util"; 
import { tplEval } from "../Runner";

export * from "./token-util"; 

export function compile(tpl: string, opt: object = {}) {
    return (data: any = {}) => {
        const astTree = tokenFold(getToken(tpl)); 

        return tplEval(
            astTree, data
        ); 
    }
}
