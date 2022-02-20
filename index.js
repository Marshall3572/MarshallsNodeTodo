// home 地址
const homedir = require('os').homedir()
// home变量（系统地址）,用户可能在环境变量中修改了默认的HOME地址，所以我们推荐用下边这中获取 home 地址的方式实现
const home = process.env.HOME || homedir
const fs = require('fs')
const p = require('path')
const dbPath = p.join(home, '.todo')

module.exports.add = (title) => {
    // macos or linux
    // fs.readFile(home + '/.todo')
    // windows
    // fs.readFile(home + '\\.todo')
    // 在不同的系统中我们如何拼接字符串呢？nodejs 提供了这样的能力
    fs.readFile(dbPath, {flag: 'a+'}, (error1, data) => {
        if (error1) {
            console.log(error1)
        } else {
            let list
            try {
                list = JSON.parse(data.toString())
            } catch (error2) {
                list = []
            }
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            const content = JSON.stringify(list)
            fs.writeFile(dbPath, content + '\n', (error3) => {
                if (error3) console.log(error3)
            })
        }
    })
}
