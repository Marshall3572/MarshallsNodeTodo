const fs = require('fs')
const p = require('path')
// home 地址
const homedir = require('os').homedir()
// home变量（系统地址）,用户可能在环境变量中修改了默认的HOME地址，所以我们推荐用下边这种获取 home 地址的方式实现
const home = process.env.HOME || homedir
const dbPath = p.join(home, '.todo')
const db = require("./db");

module.exports.add = async (title) => {
    // 1. 读之前的任务
    const list = await db.read()
    // 2. 往里边添加一个 title 任务
    list.push({title: title, done: false})
    // 3. 存储任务到文件
    await db.write(list)
}
