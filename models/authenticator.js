var pg_conn=require("./pg_config")
async function authen(user,pass){
    let authenticated = false;
    let role=''
    let shopid;
const acc_query=
{
    name: 'fetch-user',
    text:'SELECT * FROM users WHERE name=$1 AND passwd=$2',
    values:[user,pass]
}
query_data= await pg_conn.query(acc_query);

if(query_data.rowCount==1) 
{
    authenticated = true
    role=query_data.rows[0].role
    shopid=query_data.rows[0].shop
}
return [authenticated,shopid,role];
}

module.exports=authen;