//mocha --compilers js:babel-core/register test/test/add.test.js  //异步默认2000ms，加-t 5000 也可以在测试文件目录加mocha.opts

import add from '../src/add';
import { expect } from 'chai';
import fetch from 'node-fetch'

//let expect = chai.expect;

describe('加法函数的测试', function() {
	let a = false;
	beforeEach(() => {a = true});

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