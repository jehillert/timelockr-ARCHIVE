var debug = require('debug')('TimeLocker:server:routes');
var controller = require('./controllers');
var router = require('express').Router();

/*TO DO - PUT DOCUMENTATION OF MESSAGES REQUIRED BY ROUTE IN HERE*/
router.get('/credentials', controller.credentials.get);
router.put('/credentials', controller.credentials.put);
router.post('/credentials', controller.credentials.post);
router.delete('/credentials', controller.credentials.delete);

router.get('/secrets/*', controller.secrets.get);
router.put('/secrets', controller.secrets.put);
router.post('/secrets', controller.secrets.post);
router.delete('/secrets', controller.secrets.delete);

module.exports = router;