const router = require('koa-router')();
const _ = require('lodash');

router.get('/', async (ctx, next) => {
  ctx.state = {
	  title: 'koa2 title'	
  };
  
//  await ctx.render('index', {
//	  title: 'Koa test'
//  });
	ctx.body = { title: 'koa2 title'}
})


module.exports = router;
