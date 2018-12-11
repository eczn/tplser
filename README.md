
# tplser

[![npm version](https://badge.fury.io/js/tplser.svg)](//npmjs.com/package/tplser)

``` bash
# Install 
$ npm i --save tplser 
```


# Dev / Build 

怎样本地开发以及打包，欢迎 issues 、PR。 

``` bash
# 本地开发
$ npm run dev 
```

``` bash 
# 打包为 CommonJS 和 UMD 到 dist/ 下
$ npm run dist 
```


# 使用方法

## 工作流程 

1. 利用 `tplser.compile` 将模版编译为渲染函数 
2. 调用渲染函数，传入渲染参数进行渲染 

简单的来说，类似这样： 

``` js 
const render = tplser.compile(
    `why i write tplser ? {{ reason }}`
); 

const result = render({
    reason: 'just for fun'
}); 

console.log(result); 
// => why i write tplser ? just for fun
```

而将模版变为渲染函数，在 tplser 内部是将 `模版` 转化成一种 `AST`，再利用 tplser 内部实现的简单虚拟机去执行这个 AST 求出值（也就是上面的 result）这部分详情可以看我的代码实现 ^_^ 欢迎交流和 pr


## 表达式渲染 

在 tplser 里表达式的使用很常见，比如上面的例子里，`{{ reason }}` 就是个最基本的表达式了。 

``` html
{{ reason }}
```

注意，tplser 表达式不等价于 js 表达式。 


## 表达式函数应用 

目前，可以在表达式里调用函数，不过，只支持前缀调用，如： 

``` ts 
tplser.compile(`{{ add you me }}`)({
    add(left: number | string, right: number | string) {
        return left + right; 
    }, 
    you: 'john', 
    me: 'eczn'
}); 
// => 'johneczn' 
```


## 表达式常量

表达式里可以使用字符串字面量，用 `'` 开头来说明即可（不需要闭合，tplser 用空格来隔开各个单词）

``` html
{{ add 'john 'eczn }}
```


## 条件渲染 if

简单： 

``` html
{{ if ok }}
    yes, it is
{{ else }}
    no, it isn't
{{ fi }}
```


## 循环渲染 get 

循环渲染用来遍历数组里的元素。

``` html
{{ get (item, idx) >>>> list }}
    序号: {{ idx }}, 内容: {{ item }}
{{ teg }}
```


## tplser 里的作用域 

tplser 里，get 和 if 会创建新的作用域，变量查找从内层开始查找，逐层到外，直到全局作用域，如果还是找不到，返回 null。

tplser 的作用域机制类似 js 的词法作用域。 


## 全局作用域（基作用域）

tplser 注入了一些全局方法（如 `add`）到 tplser 的基作用域里。 

详见 [Scope/scope-define.ts](src/Scope/scope-define.ts)


# License 

MIT

