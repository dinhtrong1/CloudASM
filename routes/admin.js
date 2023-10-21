var express = require('express');
const session = require('express-session');
const shop = require('../models/shop');
const table_string = require('../models/table_string');
const select_box = require('../models/select_box');
const admin_table_string = require('../models/admin_table_string');

var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // res.send('respond with a resource');
  ss = req.session
  req.session.refresh_time=5000
  if (ss.role == 'director') {
    let shopdetail = await shop(ss.shopid);
    let select_box_string = await select_box(0);
    let table_string2 = await admin_table_string(0,ss.role);
    let interval = 5000;
  if (req.session.interval) {
    interval = req.session.interval*1000;
  }
    res.render('admin', {
      title: 'admin',
      name: req.body.username,
      select_box: select_box_string,
      table: table_string2,
      interval : interval
    });
  }
  else if (ss.role == 'shop') res.redirect('/users')
  else res.redirect('/login')

});
router.get('/select_shop', async function (req, res, next) {
  res.redirect('/login')
});
router.post('/select_shop', async function (req, res, next) {
  ss = req.session
  ss.shopid = req.body.shop_name
  let select_box_string = await select_box(ss.shopid);
  let table_string2 = await admin_table_string(ss.shopid,ss.role);
  let interval = 5000;
  if (req.session.interval) {
    interval = req.session.interval*1000;
  }
  res.render('admin', {
    title: 'admin',
    name: req.body.username,
    select_box: select_box_string,
    table: table_string2,
    interval : interval
  });
});

router.post('/refreshtime', async function(req, res, next) {
  req.session.interval = req.body.interval;
  res.redirect('/admin');
});
module.exports = router;