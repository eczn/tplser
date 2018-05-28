const Scope = require('./Scope')
    , compile = require('./compile')

// 
let render = compile(`
    <h1>{{ name }}</h1> 

    {{ get (item, idx) >>>> list }}
        {{ item }}, {{ idx }}
    {{ teg }}
`); 


let res = render({
    name: 'eczn', 
    list: ['h', 'e', 'l', 'l', 'o']
}); 


console.log(res); 
