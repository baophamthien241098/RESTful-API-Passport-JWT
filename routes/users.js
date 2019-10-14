var express = require('express');
var router = express.Router();
const passport = require("passport");
router.use(passport.initialize());
/* GET users listing. */


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.user);
});
module.exports = router;