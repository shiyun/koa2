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
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	sayName(){
		console.log(this.name)
	}
}
var p1 = new Person('jack', 10);
p1.sayName();

class Lawyer extends Person {
	constructor(...args){
		super(...args)
	}
}
var p2 = new Lawyer('rose', 11);
p2.sayName();