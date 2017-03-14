const respFormatter = ctx => {
	if(ctx.body == -9){
		ctx.body = {
            code: 0,
            message: 'fail'
        }
        return;
	}
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

module.exports = respFormatter