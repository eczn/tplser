import { tplGlobal } from "./scope-define"; 

export type AnyObj = {
    [key: string]: any
}

export class Scope {
    outter?: Scope; 
    vars: AnyObj; 

    constructor(vars: AnyObj = {}, outter?: Scope) {
        this.outter = outter; 
        this.vars = vars; 

        this.vars.this = this; 
    }

    find(key: any): any {
        if (key[0] === "'") return key.substring(1); 
        if (!Number.isNaN(Number(key))) return key; 

        const target = this.vars[key]; 

        if (target) {
            return target; 
        } else {
            if (this.outter) {
                return this.outter.find(key);
            } else {
                return null; 
            }
        } 
    }

    valueOf() {
        return JSON.stringify({
            ...this.vars, 
            this: '[ Circular ^_^ ]'
        }); 
    }

    extend(new_scope: AnyObj) {
        return new Scope(new_scope, this);
    }
}

export const global_scope = new Scope(tplGlobal); 
