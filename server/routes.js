var controller = require('./controllers');
var router = require('express').Router();

router.put('/secret', controller.secret.put);
router.post('/secret', controller.secret.post);
router.delete('/secret', controller.secret.delete);

router.get('/secrets', controller.secrets.get);
router.delete('/secrets', controller.secrets.delete);

module.exports = router;

