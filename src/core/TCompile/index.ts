import { getToken, tokenFold } from "./token-util"; 
import { tplEval } from "../Runner";
export * from "./token-util"; 

export function tplCompile(tpl: string) {
    return tokenFold(
        getToken(tpl)
    ); 
}

export function compile(tpl: string, opt: object) {
    return (data: any) => {
        return tplEval(tplCompile(tpl), data); 
    }
}

