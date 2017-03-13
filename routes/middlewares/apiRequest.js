import apiUtil from '../../util/apiUtil'

const apiRequest = (ctx) => {	
	/*apiUtil.request(ctx, (err, resp) => {
		console.log(err)
		console.log(resp)
		ctx.body = 'dd'
	});*/
	apiUtil.request(ctx)
		   .then(res => ctx.body = res)	
		   .catch(err => ctx.body = {code: 0, message: '请求失败'})
	ctx.body = {a: 333}
}

module.exports = apiRequest;