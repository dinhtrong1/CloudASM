var pg_conn=require("./pg_config")
async function editform(productid){
    
const acc_query=
{
    text:'SELECT * FROM product WHERE id=$1',
    values:[productid]  
}
query_data= await pg_conn.query(acc_query);
var str = ``
for (const j in query_data.rows[0]) {
    str += `<label for="fname"> ${j}</label><br>
  <input type="text" id="fname" name="${j}" value=${query_data.rows[0][j]}><br>`
}
return str;
}
module.exports=editform;