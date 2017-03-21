//import request from 'koa-request'
import _ from 'lodash'
import fetch from 'node-fetch'

const apiUtil = async ctx =>{
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

	if(ctx.query.noToken != 'false' && ctx.session.token != undefined){
		ctx.dataCont.data.token = ctx.session.token;
	}

	let data = ctx.dataCont,
		_url = global.CONFIG[data.server] + data.command,
		res, responseData;
	console.log(`[BODY]: ${JSON.stringify(data.data)}`)
		
	if(data.method == 'POST'){
		console.log(`----------------------------------------------\n[POST TO ${_url}]\n----------------------------------------------`);
		//request.post(_url, responseHandler).form(data.data);
		const options = {
		    method: "POST",
		    //json: true,			    
			headers: {
				"content-type": "application/json;chartset=utf-8",
			}, //x-www-form-urlencoded
		    body: JSON.stringify(data.data)};

		res = await fetch(_url, options);
	}else{
		let params = '?';
		_.forEach(data.data, (v, k)=>{
			if(_.isString(v)){
				params += k + '=' + v + '&';
			}else if(_.isObject(v)){
				params += k + '=' + JSON.stringify(v) + '&';
			}
		});
		console.log(`----------------------------------------------\n[GET TO ${_url}]\n----------------------------------------------`);
		res = await fetch(_url+params);
	}
	responseData = await res.json();
	console.log(`----------------------------------------------\n[RESPONSE BODY]: ${JSON.stringify(responseData)}\n----------------------------------------------`);
	return responseData;
}


module.exports = apiUtil;