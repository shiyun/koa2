//import request from 'request'
//import _ from 'lodash'
const request = require('koa-request');
const _ = require('lodash');

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

	async request(ctx, responseHandler){
		let data = ctx.dataCont,
			url = global.CONFIG[ctx.dataCont.server] + ctx.dataCont.command,
			responseData;
		console.log(ctx.dataCont);
		console.log(`[BODY]: ${JSON.stringify(data.data)}`)
		var options = {
    	url: 'https://api.github.com/repos/dionoid/koa-request',
        headers: { 'User-Agent': 'request' }
    };
 
    var response = await request(options); //Yay, HTTP requests with no callbacks! 
    //var info = JSON.parse(response.body);
    console.log(response)

    return;
		if(data.method == 'POST'){
			console.log(`----------------------------------------------\n[POST TO ${url}]\n----------------------------------------------`);
			//request.post(url, responseHandler).form(data.data);
			let options = {
			    url: url,
			    method: "POST",
			    //json: true,			    
				headers: {
					"content-type": "application/json;chartset=utf-8",
					"User-Agent" : 'request'
				}, //x-www-form-urlencoded
			    body: data.data};

			//request(options, responseHandler);
			let res = request(options);
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
			request.get(url+params, responseHandler);
		}
	}

	async api(ctx){
		this.reqCont(ctx);
		this.request(ctx, responseHandler);
	}
}

module.exports = new ApiUtil();