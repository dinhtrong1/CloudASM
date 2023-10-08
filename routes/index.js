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
// hoductan
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'login page', });
});
router.post('/edit_:id', async function (req, res, next) {
  // console.log(req.params.id)
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
    // console.log(ss)
    // let tempo2 = await shop(ss.shopid);
    // // let tempo3= await product(tempo2.id);
    // let table = await table_string(shopid);
    // res.render('users', {
    //   title: 'users', name: req.body.username,
    //   shop: tempo2,
    //   table: table
    // });
  }
  else if (tempo == true && role=='director') {
    ss=req.session
    ss.username= req.body.username
    ss.shopid=0;
    ss.role=role
    res.redirect('/admin')

    // let tempo2 = await shop(req.body.username, req.body.password);
    // let tempo3= await product(tempo2.id);
    // let table = await table_string(tempo2.id);
    // let select_box_string= await select_box(0);
    // let table_string2= await admin_table_string(0);
  
    //   res.render('admin', {
    //     title: 'admin', 
    //     name: req.body.username,
    //     select_box:select_box_string,
    //     table:table_string2
    //   });
  }
  else res.redirect('/login');
});
module.exports = router;
