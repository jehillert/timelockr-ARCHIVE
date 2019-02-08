var debug = require("debug")("TimeLocker:server:routes");
const auth = require('./helpers/auth');
var controller = require("./controllers");
var router = require("express").Router();

router.get("/login", controller.login.post);
router.post("/logout", controller.logout.get);

router.use('/credentials', auth.restrict);
router.put("/credentials", controller.credentials.put);
router.post("/credentials", controller.credentials.post);
router.delete("/credentials", controller.credentials.delete);

router.use('/secrets', auth.restrict);
router.get("/secrets", controller.secrets.get);
router.put("/secrets", controller.secrets.put);
router.post("/secrets", controller.secrets.post);
router.delete("/secrets", controller.secrets.delete);

module.exports = router;