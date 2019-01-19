var controller = require('./controllers');
var router = require('express').Router();

router.get('/secrets', controller.secrets.get);
router.post('/secrets', controller.secrets.post);
// router.put('/secrets', controller.secrets.put);       //moves 'available' date further user's secret into the future
// router.delete('/secrets', controller.secrets.delete); //deletes existing secret

// router.get('/incogSecrets', controller.incogSecrets.get);       //get secret corresponding to password
// router.post('/incogSecrets', controller.incogSecrets.post);     //create new anonymous secret
// router.put('/incogSecrets', controller.incogSecrets.put);       //moves 'available' date of anonymous secret further into future
// router.delete('/incogSecrets', controller.incogSecrets.delete); //deletes existing anonymous secret

module.exports = router;

