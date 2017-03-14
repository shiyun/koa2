const ApiError = require('./apiError');

const urlFilter = (pattern, cb) => {
	return async (ctx, next) => {
		let reg = new RegExp(pattern);
		try{
			await next();
		}catch(error){
			/*if(error instanceof ApiError && reg.test(ctx.originalUrl)){
				ctx.status = 200;
				ctx.body = {
					code: error.code,
					message: error.message
				}
			}*/
			ctx.status = 200;
			ctx.body = {
				code: error.code,
				message: error.message
			}
			throw error;
		}

		if(reg.test(ctx.originalUrl)){
			cb && cb(ctx);
		}
	}
}

module.exports = urlFilter;