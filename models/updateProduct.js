var pg_conn = require("./pg_config")
async function updateProduct(func, id, name, price, quantity, shop, defid) {

    if (func == 'insert') {
        let acc_query =
        {
         
            text: `INSERT INTO product(id, name, price, quantity, shop) VALUES ($1, $2, $3, $4, $5);`,
            values: [id, name, price, quantity, shop]
        }
        try{
            query_data = await pg_conn.query(acc_query);
            }catch(err) {
                console.log("error", 'loi');            
              }
    }
    else {
        // console.log(name);
        let acc_query =
        {
            text: `UPDATE product SET id=$1, name=$2, price=$3, quantity=$4, shop=$5 WHERE id=$6;`,
            values: [id, name, price, quantity, shop, defid]
        }
        try{
        query_data = await pg_conn.query(acc_query);
        }catch(err) {
            console.log('id khong duoc trung');            
        }
    }
    return;
}
module.exports = updateProduct;