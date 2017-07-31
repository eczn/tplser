# tplser

tplser 是一个模版引擎的实现 (使用双花括号风格的)

tplser is an implementation of a template evaluator. ( `{{ }}` style syntax ) 


# how to build  

安装依赖 


install dependencies 

``` bash 
$ npm install 
```

需要全局安装 gulp （安装过的可以不用了）

and if you do not install `gulp` globally. run this : 

``` bash 
$ npm install -g gulp 
```

最后运行这个去 build tplser.js 

in the last, run this to build `tplser.js` : 

``` bash 
$ npm run build 
```

文件在 dest 里面可以找到 

and the file output to `dest/`

# Browser 

浏览器中使用

``` html
<script src="path/to/tplser.js"></script>
```

然后 tplser 会暴露在 `window.tpl` 上 

and then : 

``` js 
// Get Render Function 
var render = tpl.fromStr(`
    <div>
        <ul>
        {{ get (item, i) >>>> list }}
            <li> {{ item }} </li>
        {{ teg }}
        </ul>
    </div>
`);

// And Pay The Data For It : 
var html = render({
    list: ['hello', 'world', 'nice', 'to', 'meet', 'you']
})
```

# Node.js 

node 中使用：

``` bash
$ npm install tplser 
```

安装好之后就可以干活了。 



``` js
var tpl = require('tplser'); 
var template = `
    <h1> {{ hello }} </h1>
`; 

var helloRender = tpl.fromStr(template, {
    compress: true
}); 

helloRender({
    hello: 'world'
}); 
// => 
// <h1> world </h1>
```

# API 

## tpl.fromStr(str[, config]) 

calling tpl.fromStr will get a render function .

调用 tpl.fromStr 将会得到 render 函数 

when feeding data to render function, `tplser` will evaluate the result : 

然后把数据喂给 render 函数，`tplser` 就可以求值得到结果了 

``` js
var render = tpl.fromStr(`{{ hello }}`); 
render({
    hello: 'world'
}); 
// =>
// 'world'
```

## tpl.fromFile(filePath[, config])

`fromFile` will read the file as `string`, and use it with `tpl.fromStr` to generate a render function. 

`fromFile` 会以字符串的形式读取文件，然后喂进 fromStr 得到 render 函数


## config 

### compress: boolean
delete `\n` or '\t' or ' ' or '\r' in template. 

使用 compress 删除多余的换行符、制表符、回车符。 

# Grammer  

语法

## 表达式 Expression Evaluation 

像下面那样用 `双花括号` 括住 `something` ：

If you use `{{ }}` to enclose something like this : 

``` html 
{{ something }}
```

这种东西在 `tplser` 里面叫做表达式（凭感觉命名的。。。 不知道有没有专业说法）

其他的语法比如用 `get` 关键字遍历数组啊或者 if/else 这样的，他们都是表达式。 

It is called Expression in `tplser`. And Other Usages like using `get` keyword to forEach a list or use if/else are all `Expression`

--- 

此外 在求值表达式的时候 求值对象可以是对象：

BTW, when evaluating an expression, object is allowed:

``` html 
{{ person.name }}
```

但是这样做是 `非法` 的：

but you `can't` do that: 

``` html
{{ person . name }}
```


## 表达式渲染 Render Evaluation

把数据喂给表达式，`tplser` 就可以正确的对模版求值了。求值只有两种情况： 

when feed the data to Expression, `tplser` will evaluate the value of it. There are 2 condition when evalueting a template: 

1. 如果 `something` 是一个普通的数据，比如数字啊，字符串或者任意其他的可以转换成函数的变量
2. 如果 `something` 是一个函数，说明这条表达式是一个函数调用，或者说数据过滤器这样的，tplser 的函数调用其实是受了 S表达式的启发，采用前缀调用的方式 （这样比较好处理！而且可以变长参数）

以下是 demo 

---

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

使用 `get` 去完成列表渲染的活儿

---

use `get` to finish list render. 

``` html 
<ul> 
    {{ get (item, index) >>>> list }}
    <li> {{ item }}, {{ index }} </li>
    {{ teg }}
</ul>
```

下一步需要把数据喂给 render 函数就行了 

---

next step is to feed data to render function .

## if / else 

你懂的 

---

easy 

``` html 
{{ if isIt }}
    <h1>Yes, it is</h1>
{{ else }}
    <h1>No, it isn't</h1>
{{ fi }}
```

# License 
MIT 
