import _ from 'lodash'

const compose = _.flow;
const curry = _.curry;

/*
let count = 0;
let memoizer = function(memo, formula){
	let recur = function(n){
		count++;
		let result = memo[n];
		if (typeof result !== 'number'){
			result = formula(recur, n);
			memo[n] = result
		}
		return result;
	}
	return recur;
}

let fibonacci = memoizer([0,1], function(recur, n){
	return	recur(n-1) + recur(n-2)
});
for (let i=0; i<=10; i++){
	fibonacci(i);
	console.log(fibonacci(i));
}
*/
const add = curry((x, y) => x + y);
const match = curry((what, str) => str.match(what));
const filter = curry((f, arr) => arr.filter(f));
const replace = curry((zj, restr, str) => str.replace(zj, restr));
const map = curry((f, arr) => arr.map(f));
const reduce = curry((f, a, arr) => arr.reduce(f, a));
const split = curry((what, str) => str.split(what));
const slice = curry((start, end, arr) => arr.slice(start, end));
const uppercase = curry(x => x.toUpperCase());
const join = curry((what, arr) => arr.join(what));
const reverse = curry(arr => arr.reverse());
const trace = curry((tag, x) => { console.log(tag, x); return x;})
const getHeader = curry(str => str[0]);
const prop = curry((prop, obj) => obj[prop]);
//let a = match(/\s+/g, "hello world");
//let a = match(/\s+/g);
//console.log(filter(a, ["tori_spelling", "tori amos"]));
//let noVowels = replace(/[aeiou]/ig);
//let strwill = noVowels('aaabac24');
//let c = strwill('*');
//console.log(c);
let words = split(' ');
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组
let sentences = map(words);
//assert.deepEqual(E.sentences(["Jingle bells Batman smells", "Robin laid an egg"]), [['Jingle', 'bells', 'Batman', 'smells'], ['Robin', 'laid', 'an', 'egg']]);
//console.log(sentences(["Jingle bells Batman smells"]));
let filterqs = filter(match(/q/ig));
//console.log(filterqs(['quickly', 'over', 'quit']))
let _keepHighest = function(x,y){ return x >= y ? x : y; };
//求数组里最大值
let max = reduce(_keepHighest, -Infinity)
//console.log(max([323,523,554,12300,5234]));
let take = slice(0);
//console.log(take(4, [1,2,3,'a', 'b', 'c']));
//取一段英语语句的单词的首字母，转成大写并用.拼接
let initials = compose(split(' '), map(getHeader), reverse, join('.'), uppercase);
//console.log(initials("hunter stockton thompson"));

// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];
/*  
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.property('in_stock', last_car);
};
*/
let isLastInStock = compose(_.last, prop('in_stock'));
let nameOfFirstCar = compose(_.first, prop('name'));
//console.log(nameOfFirstCar(CARS));

// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动
//console.log(_average([1,2,3])); //打印出来数组相加，再除以数组个数
/*var averageDollarValue = function(cars) {
  var dollar_values = map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};*/
let averageDollarValue = compose(map(prop('dollar_value')), _average)
//console.log(averageDollarValue(CARS))

// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

var _underscore = replace(/\W+/g, '_'); //<-- 无须改动，并在 sanitizeNames 中使用它

var sanitizeNames = map(compose(prop('name'), uppercase, _underscore))
console.log(sanitizeNames(CARS))