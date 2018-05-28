# tplser@2.0.1

<!-- 还没搞定  [中文文档](./doc/zh-cn.md) -->

tplser is an implementation of a template evaluator. ( `{{ }}` style syntax ) 


# how to use ?   

## Browser 

supported no longer since version 2.0.0


## Node.js 

first, downloading module from npm: 

``` bash
$ npm install --save tplser 
```

and, this is an easy example: 

``` js
const tpl = require('tplser'); 

let template = `
    <h1>{{ message }}</h1>
`; 

let render = tpl.compile(template, {
    /* some compile option ignored (as default) */
}); 

let result = render({
    message: 'hello, world'
}); 
// => 
// <h1>hello, world</h1>
```



# API 

## tpl.compile(template[, compile_opt]) 

calling tpl.fromStr will get a render function. And when feeding data to this render function, `tplser` will evaluate the result: 

``` js 
// compile_opt is ignored in this case,
// and tplser will use default option to compile template
let render = tpl.compile(`{{ hello }}`); 
render({
    hello: 'world'
}); 
// =>
// 'world'
```

## compile_opt 

| field name | default value | description |
|------------|---------------|-------------|
|  compress  |     false     | delete some additional character like `\n` or '\t' or ' ' or '\r' in template. | 


## tpl.watchFile(filePath[, compile_opt], callback)

for example: 

``` js 
const path = require('path')
    , tpl = require('tplser')
    , tpl_path = path.join(__dirname, './tpl.html'); 


function onChange(render) {
    let res = render({
        name: 'eczn' 
    }); 

    console.log(res); 
}

let wacher = tpl.watchFile(tpl_path, onChange); 
```

when file changed, `onChange` will be executed, and the render is the render function generated from `tpl_path`


## tpl.push(scope)

`push` a pre-scope when evaluating template. 


## tpl.pop() 

`pop` a pre-scope that last time you had ever pushed to. 


# Grammer  

## Expression Evaluation 

If you use `{{ }}` to enclose something like this : 

``` html 
{{ something }}
```

It is called Expression in `tplser`. And Other Usages like using `get` keyword to forEach a list or use if/else are all `Expression`

--- 

BTW, when evaluating an expression, object is allowed:

``` html 
{{ person.name }}
```

but you `can't` do that: 

``` html
{{ person . name }}
```

## String 

string are any expresstions just startswith `'`, such as: 

``` html
{{ 'i_am_eczn }}
```

## Render Evaluation

when feed the data to Expression, `tplser` will evaluate the value of it. There are 2 condition when evalueting a template: 

1. If `something` is a normal data, such as number, string or and other data can be converted to a string 
2. If `something` is a function, it means `function invoktion`, or called `data filter`, tplser's function inspired by S-Expressiion, (easy to parse) 

An Demo Here :

``` html
<!-- this is template  -->
<ul>
    {{ get (item, index) >>>> list }}
    <li> {{ toUpperCase item }} </li>
    {{ teg }}
</ul>
```

``` js
var template = '...' ; 

var render = tpl.fromStr(template, {
    compress: false
}); 

var html = render({
    list: ['a', 'B', 'c', 'd']
    toUpperCase: a => a.toUpperCase()
}); 
// => 
// <ul>
//     <li> A </li>
//     <li> B </li>
//     <li> C </li>
//     <li> D </li>
// </ul>
```

## get 

use `get` to finish list render. 

``` html 
<ul> 
    {{ get (item, index) >>>> list }}
    <li> {{ item }}, {{ index }} </li>
    {{ teg }}
</ul>
```

and next step is to feed data to render function.


## if / else 

easy: 

``` html 
{{ if isIt }}
    <h1>Yes, it is</h1>
{{ else }}
    <h1>No, it isn't</h1>
{{ fi }}
```

# built in function

`tplser` implements some built in function. 


## let 

You can use `let` to get a alias of an expression.

Syntax Structure: `let 'Name Exporession` 

it equals to `let Name = Expression` 

such as `let 'name 'eczn` means `let name = 'eczn';`

BTW, there is a `'` before `Name`, DO NOT IGNORE IT. 

Example: 

``` html
<!-- let name = 'eczn'; -->
{{ let 'name 'eczn }}
{{ name }}
```

结果是 `eczn`

the result is `eczn`

## getPropertyOf 

you can use `getPropertyOf` to get property of an obj; 

although you can use '.' to get property of an obj, but you can't use variable as key to get property. 

such as : 

``` html 
{{ getPropertyOf obj val1 val2 val3 ... }} 
```

`tplser` will interpret it as `obj[val1][val2][val3]` 

Go further: 

``` js
let albums = {
    "home": ['0.jpg', '1.png'],
    "school": ['my school.jpg']
}
let locals = ["home", "school"]; 
```

``` html
{{ get (local, idx) >>>> locals }}
    {{ let 'album getPropertyOf albums local }}

    {{ get (pic, pic_idx) >>>> album }}
        <img src="{{ pic }}" alt="local" />
    {{ teg }}
{{ teg }}
```

the result is : 

``` html
<img src="0.jpg" alt="local" />
<img src="1.png" alt="local" />
<img src="my school.jpg" alt="local" />
```

# Performance 

i do a simple speed test, code for testing:

``` html 
{{ get (item, idx) >>>> list }}
    {{ item }}
{{ teg }}
```

``` html
{{ each list }}
    {{ $value }}
{{ /each }}
```

``` js
var arr = new Array(2048).fill(0); 
var counter = 20; 

console.time('More'); 
for (let i = 0; i < counter; i++){
    render({
        list: arr
    }); 
}
console.timeEnd('More'); 
```

test result:  

1. art-template: 23.096 ms 
2. tplser: 62.283 ms 

# License 

MIT 
