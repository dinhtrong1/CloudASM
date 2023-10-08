var pg_conn=require("./pg_config")
async function shop(shopid){
let str=''
const acc_query=
{
    text:'SELECT * FROM shop WHERE id=$1',
    values:[shopid]
}
query_data= await pg_conn.query(acc_query);
str += `<table class="center" ><tr>`
    for (var i = 0; i < query_data.fields.length; i++) {
        str += `<th>${query_data.fields[i].name}</th>`
    }
    str += `</tr>`
    str += `<tr>`
for (const j in query_data.rows[0]) {
    str += `<td>${query_data.rows[0][j]}</td>`
}
    str += `</tr>`
return str;
}

module.exports=shop;