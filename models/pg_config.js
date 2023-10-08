const  Pool = require('pg').Pool;
const pg_conn = new Pool({
  user: 'swstkxwujetyxq',
  host: 'ec2-54-211-177-159.compute-1.amazonaws.com',
  database: 'da978fka467si',
  password: 'c2e8f7fe010299191af7fd23d77051785fe5b58001a350e4182c4c3abf642c38',
  port: 5432,
  ssl:{
    rejectUnauthorized: false
  },
});
module.exports = pg_conn;   