var controller = require('./controllers');
var router = require('express').Router();

router.get('/secrets', controller.secrets.get);
router.post('/secrets', controller.secrets.post);
router.put('/secrets', controller.secrets.put);
router.delete('/secrets', controller.secrets.delete); //deletes existing secret

module.exports = router;

