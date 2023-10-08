var pg_conn=require("./pg_config")
async function deleteProduct(productid){
    
 pg_conn.query(`DELETE FROM product WHERE id=$1`,[productid]);


return 0;
}
module.exports=deleteProduct;