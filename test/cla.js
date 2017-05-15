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
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.sayName = function () {
        console.log(this.name);
    };
    return Person;
}());
var p1 = new Person('jack', '10');
p1.sayName();
var options = {};
options.color = "red";
options.volume = 11;
var isTrue = true;
var names = "Gene";
var age = 37;
var arr = ['1', 2, 3];
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["yellow"] = 2] = "yellow";
})(Color || (Color = {}));
;
var c = Color.red;
//console.log(c)
var someValue = true;
var strLength = someValue.length;
//console.log(someValue, strLength)
var kitty = {
    name: "Aurora",
    numLives: 'numLivesForCat'
};
kitty.name = '12';
console.log(kitty);
