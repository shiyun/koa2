/*function Person(name, age){
	this.name = name;
	this.age = age;
}

Person.prototype.sayName = function(){
	console.log(this.name)
}

var p1 = new Person('jack', 10);
p1.sayName();

function Lawyer(){
	Person.apply(this, arguments)
}

Lawyer.prototype = new Person;
var p2 = new Lawyer('rose', 11);
p2.sayName();*/

class Person {
	name: string;
	age: number;
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	sayName(){
		console.log(this.name)
	}
}
var p1 = new Person('jack', '10');
p1.sayName();

interface Options { color: string; volume: number }

let options = {} as Options;
options.color = "red";
options.volume = 11;
let isTrue: boolean = true;
let names: string = `Gene`;
let age: number = 37;
let arr: [string, number, number] = ['1',2,3];
enum Color {red, green, yellow};
let c: Color = Color.red;
//console.log(c)

let someValue: any = true;

let strLength: number = (<string>someValue).length;
//console.log(someValue, strLength)
const kitty = {
    name: "Aurora",
    numLives: 'numLivesForCat',
}
kitty.name = '12';
console.log(kitty)