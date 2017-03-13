let apiCtrl = {};

apiCtrl.getUser = async (ctx, next) => {

	ctx.body = {
		username: '乖乖',
		password: '123456',
	}
}

apiCtrl.registerUser = async (ctx, next) => {
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

module.exports = apiCtrl;