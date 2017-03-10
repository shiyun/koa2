const urlFilter = (pattern) => {
	return async (ctx, next) => {
		let reg = new RegExp(pattern);
		await next();

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