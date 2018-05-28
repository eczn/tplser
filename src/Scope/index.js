const global_scope = require('./scope-define')
    , scope_chain = []
    , Scope = {}

module.exports = Scope; 

// Global Base 
scope_chain.push(global_scope); 

// Proxy 
Scope.push = (...args) => scope_chain.push(...args); 
Scope.pop = (...args) => scope_chain.pop(...args); 


/**
 * 在全局作用域上拓展一个新链 
 * @template T
 * @param { T } new_scope 
 * @returns { Array<T> }
 */
Scope.extend = function(new_scope) {
    return scope_chain.concat([
        new_scope
    ]); 
}

