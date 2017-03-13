//import request from 'request'
//import _ from 'lodash'
const request = require('koa-request');
const _ = require('lodash');
import fetch from 'node-fetch'

class ApiUtil {
	constructor(){
		
	}

	reqCont(ctx){
		ctx.dataCont = {};
		let url = ctx.url.split('/');
		if(url.length < 3){
			ctx.body = {
				code: 0,
				message: '请求的路径有误！',
				data: []
			}
			reutrn ;
		}		
		ctx.dataCont.server = url[2];
		ctx.dataCont.command = url[3];
		if(url.length > 3){
			url.splice(0, 2);
			ctx.dataCont.command = url.join('/');
		}
		let method = ctx.method;
		if(method == 'POST'){
			ctx.dataCont.data = ctx.request.body;
			ctx.dataCont.method = 'POST';
		}else{
			ctx.dataCont.data = ctx.query;
			ctx.dataCont.method = 'GET';
		}
	}

	async request(ctx){
		let data = ctx.dataCont,
			url = global.CONFIG[ctx.dataCont.server] + ctx.dataCont.command,
			responseData;
		console.log(`[BODY]: ${JSON.stringify(data.data)}`)
  		
		if(data.method == 'POST'){
			console.log(`----------------------------------------------\n[POST TO ${url}]\n----------------------------------------------`);
			//request.post(url, responseHandler).form(data.data);
			const options = {
			    method: "POST",
			    //json: true,			    
				headers: {
					"content-type": "application/json;chartset=utf-8",
				}, //x-www-form-urlencoded
			    body: JSON.stringify(data.data)};

			const res = await fetch(url, options);
			responseData = await res.json();
		}else{
			let params = '?';
			_.forEach(data.data, (v, k)=>{
				if(_.isString(v)){
					params += k + '=' + v + '&';
				}else if(_.isObject(v)){
					params += k + '=' + JSON.stringify(v) + '&';
				}
			});
			console.log(`----------------------------------------------\n[GET TO ${url}]\n----------------------------------------------`);
			const res = await fetch(url+params);
			responseData = await res.json();
		}
		return responseData;
	}

	async api(ctx){
		this.reqCont(ctx);
		let data = this.request(ctx);
		ctx.body = data;
	}
}

module.exports = new ApiUtil();