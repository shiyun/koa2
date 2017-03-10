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
	ctx.body = {
		username: '111乖乖',
		password: '123456',
	}
}

module.exports = apiCtrl;