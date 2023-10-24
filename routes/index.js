const { name } = require('ejs');
var express = require('express');
const authen = require('../models/authenticator');
const shop = require('../models/shop');
const product = require('../models/product');
const select_box = require('../models/select_box');
const table_string = require('../models/table_string');
const admin_table_string = require('../models/admin_table_string');
const e = require('express');
const editform = require('../models/editform');
const deleteProduct = require('../models/deleteProduct');
var router = express.Router();
var ss;
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'login page', });
});
router.post('/edit_:id', async function (req, res, next) {
  let tempo= await editform(req.params.id)
  res.render('edit', { editform:tempo, });
});
router.get('/logout', async function (req, res, next) {
  ss=req.session
  if(ss.username)
  {
    req.session.destroy()
    res.redirect('/login')
  }
  else res.redirect('/login')  ;

  
});

router.post('/login', async function (req, res, next) {
  let [tempo,shopid,role] = await authen(req.body.username, req.body.password);
  if (tempo == true && role=='shop') {
    ss=req.session
    ss.username= req.body.username
    ss.shopid=shopid
    ss.role=role
    res.redirect('/users')
  }
  else if (tempo == true && role=='director') {
    ss=req.session
    ss.username= req.body.username
    ss.shopid=0;
    ss.role=role
    res.redirect('/admin')
  }
  else res.redirect('/login');
});
module.exports = router;
