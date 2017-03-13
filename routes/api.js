//const router = require('koa-router')();
import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})
const apiCtrl = require('../controller/apiController');

router.get('/getUser', apiCtrl.getUser);

router.post('/registerUser/:id?/:kid?', apiCtrl.registerUser);

module.exports = router;
