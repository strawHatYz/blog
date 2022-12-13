const {exec} = require('../db/mysql')

const loginCheck = (username, password) => {
  const sql = `select username,realname from users where username='${username}' and password='${password}'`
  return exec(sql).then(rows=>{
    console.log('%c [ rows ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', rows)
    return rows[0] || {}
  })
}

module.exports = {
  loginCheck
}