const ApiError = require('./apiError');

const urlFilter = (pattern) => {
	return async (ctx, next) => {
		let reg = new RegExp(pattern);
		try{
			await next();
		}catch(error){
			if(error instanceof ApiError && reg.test(ctx.originalUrl)){
				ctx.status = 200;
				ctx.body = {
					code: error.code,
					message: error.message
				}
			}

			throw error;
		}

		if(reg.test(ctx.originalUrl)){
			respFormatter(ctx);
		}
	}
}

const respFormatter = ctx => {
	if(ctx.body){
		ctx.body = {
			code: 1,
			message: 'success',
			data: ctx.body
		}
	}else{
		ctx.body = {
            code: 0,
            message: 'fail'
        }
	}
}

module.exports = urlFilter;