export type Value = (number | string); 

export type StringToken = string;

export type GetToken = {
	todo: 'get', 
	args: Value[], 
	inner: Token[]
}

export type IfToken = {
	todo: 'if', 
	args: Value[], 
	inner: Token[]
}

export type RenderToken = {
	todo: 'render', 
	args: Value[]
}

export type EndToken = {
	todo: 'fi' | 'teg' | 'else'
}

export type Token = StringToken | GetToken | IfToken | RenderToken | EndToken
