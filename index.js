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

module.exports.showAll = async () => {
    // 读取之前的任务
    const list = await db.read()
    if (JSON.stringify(list) === '[]') console.log('暂时没有任务要做')
    // 打印之前的任务
    list.forEach((task, index) => {
        console.log(`${task.done ? '(x)' : '(_)'} ${index + 1} - ${task.title}`)
    })
}
