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

// auth.restrict
router.put('/credentials', controller.credentials.put);
router.delete('/credentials', controller.credentials.delete);

router.get('/secrets', controller.secrets.get);
router.put('/secrets', controller.secrets.put);
router.post('/secrets', controller.secrets.post);
router.delete('/secrets', controller.secrets.delete);

module.exports = router;