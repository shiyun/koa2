//const router = require('koa-router')();
import Router from 'koa-router'
import {apiCtrl, apiArr} from '../controller/apiController';
const router = new Router({
  prefix: '/api'
})

router.post(`/${apiArr[0]}`, apiCtrl[apiArr[0]])
	  .get(`/${apiArr[1]}`, apiCtrl[apiArr[1]])
	  .post(`/${apiArr[2]}/:id?/:kid?`, apiCtrl[apiArr[2]]);

module.exports = router;
