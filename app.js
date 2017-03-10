const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
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
const respFormatter = require('./routes/middlewares/respFormatter');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  map: {html: 'ejs'}
}));
/*
app.use(views(__dirname + '/views', {
  //extension: 'jade'
  map: {html: 'jade'}
}));
*/

// filter /api 
app.use(respFormatter('^/api'));
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;