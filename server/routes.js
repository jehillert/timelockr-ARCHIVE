const debug = require('debug')('server:routes');
const auth = require('./helpers/auth');
const controller = require('./controllers');
const router = require('express').Router();

// route-specific middleware
router.use('/signup', auth.hashPassword);

//routes
router.post('/signin', controller.signin.post);
router.post('/logout', controller.logout.get);
router.post('/signup', controller.signup.post);

router.put('/credentials', auth.restrict, controller.credentials.put);
router.delete('/credentials', auth.restrict, controller.credentials.delete);

router.get('/secrets', auth.restrict, controller.secrets.get);
router.put('/secrets', auth.restrict, controller.secrets.put);
router.post('/secrets', auth.restrict, controller.secrets.post);
router.delete('/secrets', auth.restrict, controller.secrets.delete);

module.exports = router;