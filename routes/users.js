import Router from 'koa-router'

const router = new Router({
  prefix: '/users'
});


router.get('/a', function (ctx, next) {
  ctx.body = 'this a users response!';
});

module.exports = router;
