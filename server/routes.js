const debug = require('debug')('server:routes');
const auth = require('./helpers/auth');
const controller = require('./controllers');
const router = require('express').Router();

// route-specific middleware
router.use('/signup', auth.hashPassword);
router.use('/credentials', auth.restrict);
router.use('/secrets', auth.restrict);

//routes
router.post('/login', controller.login.post);
router.post('/logout', controller.logout.get);
router.post('/signup', controller.signup.post);

router.put('/credentials', controller.credentials.put);
router.delete('/credentials', controller.credentials.delete);

router.get('/secrets', controller.secrets.get);
router.put('/secrets', controller.secrets.put);
router.post('/secrets', controller.secrets.post);
router.delete('/secrets', controller.secrets.delete);

module.exports = router;