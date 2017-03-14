import apiUtil from '../../util/apiUtil'
import {apiArr} from '../../controller/apiController';

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
		const _url = ctx.originalUrl;
		const commandArr = _url.split('/');
		const command = commandArr[commandArr.length - 1];
		if(reg.test(_url) && apiArr.indexOf(command) == -1){
			let data = await apiUtil(ctx);
			ctx.body  = data;
		}
	}
}

module.exports = apiRequest;