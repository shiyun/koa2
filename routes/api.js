const router = require('koa-router')();
const apiCtrl = require('../controller/apiController');

router.get('/getUser', apiCtrl.getUser);

router.post('/registerUser/:id?/:kid?', apiCtrl.registerUser);

module.exports = router;
