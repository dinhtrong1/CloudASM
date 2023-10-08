var pg_conn = require("./pg_config")
async function table_string(shopid) {
    if (shopid==0) {
        var   acc_query =
        {
            text: 'SELECT * FROM product',
        }  
    }
    else {var acc_query =
    {
        text: 'SELECT * FROM product WHERE shop=$1',
        values: [shopid]
    }
    }
    query_data = await pg_conn.query(acc_query);

    var str = ``
    str += `<table class="center" ><tr>`
    for (var i = 0; i < query_data.fields.length; i++) {
        str += `<th>${query_data.fields[i].name}</th>`
    }
    str += `</tr>`
    for (var i = 0; i < query_data.rows.length; i++) {
        str += `<tr>`
        for (const j in query_data.rows[i]) {
            str += `<td>${query_data.rows[i][j]}</td>`
        }
        
       
        if (shopid==0) str+=`<td> <form action="/edit/${query_data.rows[i].id}" method="post">
         <input name ="button"type="submit" value="Update">
       </form> </td>
       <td> <form action="/delete/${query_data.rows[i].id}" method="post">
         <input name ="button" type="submit" value="Delete">
       </form> </td>
        `
        str += `</tr>`
    }
    str+=  `</table>`
    return str;
}
module.exports = table_string;
