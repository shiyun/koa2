import apiUtil from '../../util/apiUtil'

const apiRequest = async (ctx) => {	
	apiUtil.request(ctx, (err, resp) => {
		console.log(err)
		console.log(resp)
		ctx.body = 'dd'
	});
	//let respBody = await apiUtil.request(ctx);
	//ctx.body = respBody
}

module.exports = apiRequest;