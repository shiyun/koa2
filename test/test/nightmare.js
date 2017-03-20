var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#zero_click_wrapper .c-info__title a')
  .evaluate(function () {
    return document.querySelector('#zero_click_wrapper .c-info__title a').href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

/*

var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });


nightmare
  .goto('https://www.baidu.com/')
  .type('#kw', 'nightmare evaluate')
  .click('form[action*="/s"] [type=submit]')
  .wait(3000)
  .exists('#spulist-grid')
//  .wait('#spulist-grid')
  .wait('#page a')
  .click('#page a')
  .evaluate(function () {
	  let arr = [];
      let els = document.querySelectorAll('h3.t a');
	  for (let i = 0, n = els.length; i<n; i++){
		  arr.push(els[i].innerHTML);
	  }	 
	  return arr;
  })

  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
  */
  /*
  .evaluate(function () {
	  let arr = [];
      let els = document.querySelectorAll('h3.t a');
	  for (let i = 0, n = els.length; i<n; i++){
		  arr.push(els[i].innerHTML);
	  }	  
	  return arr;
  })
  .wait(1000)
  .click('#page a .pc')
  .evaluate(function () {
      let els = document.querySelectorAll('h3.t a');
	  for (let i = 0, n = els.length; i<n; i++){
		  arr.push(els[i].innerHTML);
	  }	 
	  return arr;
  })
  */