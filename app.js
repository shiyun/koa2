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
import session from "koa2-cookie-session";
//const render = require('koa-ejs');

const index = require('./routes/index');
const api = require('./routes/api');
const users = require('./routes/users');
import urlFilter from './routes/middlewares/urlFilter';
import respFormatter from './routes/middlewares/respFormatter';
import apiRequest from './routes/middlewares/apiRequest';
//import apiUtil from './util/apiUtil';

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/src'));
app.use(require('koa-static')(__dirname + '/gulp/public'));

app.use(views(__dirname + '/views', {
  map: {html: 'ejs'}
}));
/*
app.use(views(__dirname + '/views', {
  //extension: 'jade'
  map: {html: 'jade'}
}));
*/
app.use(session({
    key: "koa2",   //default "koa:sid" 
    expires:3, //default 7 
    path:"/" //default "/" 
}));
app.use(apiRequest('^/api'));
/*app.use(async (ctx, next) => {
	const _url = ctx.url;
	if(/api\//.test(_url) && !(_url.indexOf('getUser') > -1 || _url.indexOf('registerUser') > -1)){
		let data;
		try{
			data = await apiUtil(ctx, true)
		}catch(e){
			data = {code: 0, message: '请求的路径有误！'};
		}
		ctx.body = data;
	}else{
		await next()
	}
});*/
app.use(urlFilter('^/api', respFormatter));
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

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;