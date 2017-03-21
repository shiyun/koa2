//mocha --compilers js:babel-core/register test/test/add.test.js  //异步默认2000ms，加-t 5000 
//mocha --opts test/test/add.test.js -t 5000 //也可以在测试文件目录加mocha.opts 命令行直接--opts 会自动读取当前文件夹下的.opts文件

import add from '../src/add';
import { expect, assert } from 'chai';
import fetch from 'node-fetch'

//let expect = chai.expect;

describe('加法函数的测试', function() {
	let a = false;
	beforeEach(() => {a = true});
  
  //assert的用法
  it('Exercise 1', function(){
    assert.equal(add(1,1), 2);
    //assert.deepEqual(add(1,1), 2); 数组或对象用这个来测试
  });

  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });

  it('test', () => {
	expect(add(1, 3)).to.be.equal(4);
  });

  it('修改全局', () => {
	expect(a).to.be.equal(true);
  })


});


describe('测试2', function() {
	let a = false;
	beforeEach(() => {a = true});

  it('1 加 3 应该等于 4', function() {
    expect(add(1, 3)).to.be.equal(4);
  });
  it('异步请求应该返回一个对象', function(done){
	  fetch('https://api.github.com')
		.then(function(res){
		  expect(res).to.be.an('object');
		  done();
		});
	});
//   it('异步请求应该返回一个对象', function(done){
//  fetch('https://api.github.com')
//    .then(function(res){
//      expect(res).to.be.an('object');
//      done();
//    });
//});
});