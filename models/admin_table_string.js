var pg_conn=require("./pg_config");


async function admin_table_string(shop_id,role){
    let disable="";
    // console.log("inside"+role);
    if (role=="director") disable="disabled"
    if(shop_id==0){
        var product_query='SELECT * FROM product ORDER BY id'
    }
    else{
        var product_query=
        {
            text: 'SELECT * FROM product WHERE shop=$1 ORDER By id',
            values: [shop_id]
        };
    }
    var data= await pg_conn.query(product_query);
    var table_string=''
    if (shop_id!=0) table_string+=`
    <h2> Product of shop ${shop_id}</h2>
        <table class="table table-striped">
        <tr>`
    else table_string+=`
    <h2> Product of shop All shop</h2>
        <table  class="table table-striped">
        <thead>
        <tr>`
    let num_fields=data.fields.length;
    let num_rows=data.rowCount;
    const list_fields= [];
    // Display table header(list of fields name)
    for(let i=0; i<num_fields;i++)
    {
        let fields_name=data.fields[i].name;
        list_fields.push(fields_name);
        table_string += `<th>${fields_name}</th>`
    }
    if (role=="shop") table_string +=`<th>function</th>
    </tr>  
    </thead>
    `
    // display all row
    for(let i=0;i<num_rows;i++)
    {
        table_string +=`<form action="/users/functions" method="post">
        <tbody>
        <tr>`;
        // display all cell
        for(let j=0; j<num_fields;j++)
        {
            let cell=data.rows[i][list_fields[j]]
            let fields_name=data.fields[j].name
            table_string+=`<td> <input ${disable} name="${fields_name}" value="${cell}">
            <input name="def${fields_name}" hidden value="${cell}"></td>`
        }
        if (role=="shop")table_string +=`
        <td style="display:flex">
        <button name="btt" type="submit" value="delete">Delete</button>
        <button name="btt" type="submit" value="update">Update</button>
        </td>`

        table_string += 
        `</tr>
        </form>`
    }
    // thêm dòng insert
    if(role=="shop")
    {
    table_string +=`<form action="/users/functions" method="post">
        <tr>`
    for(let j=0; j<num_fields;j++)
        {
            let fields_name=data.fields[j].name
            if (fields_name=="shop") table_string+=`<td><input name="${fields_name}"  value="${shop_id}"></td>`
            else table_string+=`<td><input name=${fields_name}></td>`
        }
        table_string +=`
        <td>
        <button name="btt" type="submit" value="insert">Insert</button>
        </td>
        </tr>
        </tbody>
        </form>`
    table_string+=`</table>`;
    }
        return table_string;
}

module.exports=admin_table_string