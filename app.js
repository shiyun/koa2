const Koa = require('koa');
const app = new Koa();
//const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
//const render = require('koa-ejs');

const index = require('./routes/index');
const api = require('./routes/api');
const users = require('./routes/users');
//const respFormatter = require('./routes/middlewares/respFormatter');
import urlFilter from './routes/middlewares/urlFilter';
import respFormatter from './routes/middlewares/respFormatter';
import apiDataCont from './routes/middlewares/apiDataCont';
import apiRequest from './routes/middlewares/apiRequest';

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/src'));

app.use(views(__dirname + '/views', {
  map: {html: 'ejs'}
}));
/*
app.use(views(__dirname + '/views', {
  //extension: 'jade'
  map: {html: 'jade'}
}));
*/

app.use(async (ctx, next) => {
	/*
	urlFilter('^/api', () => {
		apiDataCont(ctx, next);
	})
	*/
	if(/api\//.test(ctx.url)){
		apiDataCont(ctx, next);
	}else{
		console.log(1)

	}
});

app.use(async (ctx, next) => {
	if(/api\//.test(ctx.url)){
		apiRequest(ctx);
	}else{
		console.log(11)

	}
});
//app.use(urlFilter('^/api', respFormatter));
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(index.routes());
app.use(api.routes());
app.use(users.routes());
//router.use('/', index.routes(), index.allowedMethods());
//router.use('/api', api.routes(), api.allowedMethods());
//router.use('/users', users.routes(), users.allowedMethods());
//app.use(router.routes(), router.allowedMethods());
// response

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;