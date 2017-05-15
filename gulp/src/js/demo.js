'use strict';
import _ from 'lodash';

const bMark = 'v-text';
const initData = {date: new Date(), msg: 'xxx'};
const root = document.getElementById('testa'),
	  els = root.querySelectorAll(`[${bMark}]`);

let bindData = {},
	data = {};

[].map.call(els, el => {
	let vari = el.getAttribute(bMark);
	bindData[vari] = {};
});

let bind = vari => {
	bindData[vari].els = root.querySelectorAll(`[${bMark}="${vari}"]`);

	[].map.call(bindData[vari].els, el => el.removeAttribute(bMark));

	Object.defineProperty(data, vari, {
		set: nval => {		
			[].map.call(bindData[vari].els, el => {
				if(el.textContent == nval) return;
				bindData[vari].value = el.textContent = nval;		
			});
		},
		get: _ => bindData[vari].value
	});
};

_.map(bindData, (v, k) => bind(k));

if(initData && _.isObject(initData)) {
	_.map(initData, (v, k)=> {
		data[k] = v;
	});
}


const updateData = newData => {
	_.map(newData, (v, k) => {
		if(data.hasOwnProperty(k) && data[k] != v){
			data[k] = v;
		}
	});
};

root.addEventListener('click', _ => {
    updateData({
        date: "2017-07-02",
        msg: "world"
    });
},false);


/*
const bindingMark = 'v-text';

let initData = {date: new Date(), msg: 'hello'}

let bindings = {};
let data = {};

const root = document.getElementById('testa'),
	els = root.querySelectorAll(`[${bindingMark}]`);

[].map.call(els, el => {
	let variable = el.getAttribute(bindingMark);
	bindings[variable] = {};
});

var bind = vari => {
	bindings[vari].els = root.querySelectorAll(`[${bindingMark}="${vari}"]`);

	[].map.call(bindings[vari].els, el => el.removeAttribute(bindingMark));

	Object.defineProperty(data, vari, {
		set: nval => {
			[].map.call(bindings[vari].els, el => {
				bindings[vari].value = el.textContent = nval;			
			});		
		},
		get: _ => bindings[vari].value
	});
}

_.map(bindings, (v, k) => bind(k));

if(initData)
	_.map(initData, (v, k) => data[k] = initData[k])

const updateData = newData => {
	_.map(newData, (v, k) => {
		if(data.hasOwnProperty(k) && data[k] != newData[k]){
			data[k] = newData[k];
		}
	});
};

root.addEventListener('click', _ => {
    updateData({
        date: "2017-07-02",
        msg: "world"
    });
},false);
*/