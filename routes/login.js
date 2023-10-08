var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  ss=req.session
  if(ss.role=='shop') res.redirect('/users')
  else if (ss.role=='director')res.redirect('/admin')
  else res.render('login', { title: 'login', });

});


module.exports = router;
