const router = require('koa-router')();
const _ = require('lodash');

router.get('/', async (ctx, next) => {	
	ctx.state = {
		title: 'koa2 and ng1'	
	};
  
	await ctx.render('index', {
	  title: 'Koa test'
	});
	//ctx.body = { title: 'koa2 title'}
})

router.get(/\/ng\/*/, async (ctx, next) => {
	console.log(ctx.url)
	console.log(ctx.method)
	await ctx.render('index', {title: 'ng and koa2'});
})

module.exports = router;
