import apiUtil from '../../util/apiUtil'

const apiReqCont = async (ctx, next) => {
	apiUtil.reqCont(ctx);
	await next();
}

module.exports = apiReqCont;