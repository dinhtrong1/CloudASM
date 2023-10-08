var express = require('express');
const session = require('express-session');
const shop = require('../models/shop');
const table_string = require('../models/table_string');
const admin_table_string = require('../models/admin_table_string');
const deleteProduct = require('../models/deleteProduct');
const updateProduct = require('../models/updateProduct');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // res.send('respond with a resource');
  
   ss =req.session
  if (ss.role=='shop'){
  let shopdetail = await shop(ss.shopid);
    // let tempo3= await product(tempo2.id);
    let table = await admin_table_string(ss.shopid,ss.role);
    res.render('users', {
      title: 'users', name: ss.username,
      shop: shopdetail,
      table: table
    });
  }
  else  if (ss.role=='director')res.redirect('/admin')
  else res.redirect('/login')

});

router.get('/functions', async function (req, res, next) {
  res.redirect('/login')
});
router.post('/functions', async function (req, res, next) {
  ss=req.session
  console.log(ss)
  // console.log(req.params.function)
  console.log(req.body)
  let func = req.body.btt
  if (func == 'delete') await deleteProduct(req.body.id)
  else await updateProduct(func, req.body.id, req.body.name, req.body.price, req.body.quantity, req.body.shop, req.body.defid)
  // let select_box_string = await select_box(ss.shopid);
  let shopdetail = await shop(ss.shopid);
  // let tempo3= await product(tempo2.id);
  let table = await admin_table_string(ss.shopid,ss.role);
  res.render('users', {
    title: 'users', name: ss.username,
    shop: shopdetail,
    table: table
  });
});
module.exports = router;
