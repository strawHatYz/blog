const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author){
    sql += `and author='${author}' `
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }
  sql += 'order by createtime desc;'

  // 返回Promise
  return exec(sql)
}

const getDetail = (id)=>{
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then((rows)=>{
    return rows[0]
  })
}

const newBlog = (blogData  ={}) =>{
  /**
   * @desc 新建博客
   * @params blogData.title 
   * @params blogData.content
   */

  const {title,content,author} = blogData
  const createtime = Date.now()

  const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}');`
  return exec(sql).then(insertData=>{
    console.log('insertData ',insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData  ={}) =>{
  /**
   * @desc 修改博客
   * @params blogData.title 
   * @params blogData.content
   * @params id  更新博客的id
   */
  const {title,content} = blogData
  const sql = `update blogs set title='${title}',content='${content}' where id=${id}`
  return exec(sql).then(updateData=>{
    console.log('updateData ',updateData)
    // affectedRows一般情况有值
    if(updateData.affectedRows > 0){
      return true
    }
    return false
  })
}

const deleteBlog = (id,author) =>{
  console.log('id',id)
  /**
   * @desc 删除博客
   * @params id  更新博客的id
   */
  const sql =  `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(deleteData=>{
    // affectedRows一般情况有值
    if(deleteData.affectedRows > 0){
      return true
    }
    return false
  })
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}