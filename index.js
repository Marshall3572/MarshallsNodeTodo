const db = require("./db");

module.exports.add = async (title) => {
    // 1. 读之前的任务
    const list = await db.read()
    // 2. 往里边添加一个 title 任务
    list.push({title: title, done: false})
    // 3. 存储任务到文件
    await db.write(list)
}

module.exports.clear = async () => {
    await db.write([])
}
