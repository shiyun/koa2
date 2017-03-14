import fetch from 'node-fetch';
const apiArr = ['login', 'getUser', 'registerUser'];

let apiCtrl = {};
let options = {
	    method: "POST",
		headers: {
			"content-type": "application/json;chartset=utf-8",
		}, 
	    //body: JSON.stringify(data.data)
};
apiCtrl[apiArr[0]] = async (ctx, next) => {
	let url = global.CONFIG['APIURL'] + 'login';
	console.log(url)
	console.log(ctx.request.body)
	
	options.body = JSON.stringify(ctx.request.body);
	let data = await fetch(url, options);
	let body = await data.json();
	if(body.status.code == 1){
		ctx.session.token = body.result.token;
		ctx.body = body;
	}else{
		ctx.body = -9;
	}
	
}

apiCtrl[apiArr[1]] = async (ctx, next) => {
	ctx.body = {
		username: '乖乖',
		password: '123456',
	}
}

apiCtrl[apiArr[2]] = async (ctx, next) => {
	console.log(`registerUser: `, ctx.request.body);
	console.log(`registerUser: `, ctx.query);
	console.log(`registerUser: `, ctx.params);

	//模拟接口延迟
	const f = () => {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{resolve(333)}, 1000)
		})
	}
	const a = await f();
	ctx.body = {
		username: '111乖乖',
		password: '123456',
		a
	}
}

module.exports = {
	apiCtrl,
	apiArr
};