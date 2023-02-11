const {Client} = require("pg")
var pg = require("pg")
pg.types.setTypeParser(1114, str => str);

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 's1jeenar',
    database: 'univ_data'
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})


module.exports = client