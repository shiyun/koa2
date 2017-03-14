import apiUtil from '../../util/apiUtil'

const apiRequest = (pattern) => {	
	return async (ctx, next) => {
		let reg = new RegExp(pattern);
		try{
			await next();
		}catch(error){
			if(reg.test(ctx.originalUrl)){
				ctx.status = 200;
				ctx.body = {
					code: 0,
					message: '请求失败'
				}
			}

			throw error;
		}
		if(reg.test(ctx.originalUrl)){
			let data = await apiUtil(ctx);
			ctx.body  = data;
		}
	}
}

module.exports = apiRequest;