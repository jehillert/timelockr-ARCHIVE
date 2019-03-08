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

router.get('/entries', controller.entries.get);
router.put('/entries', controller.entries.put);
router.post('/entries', controller.entries.post);
router.delete('/entries', controller.entries.delete);

module.exports = router;