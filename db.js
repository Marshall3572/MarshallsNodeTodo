const fs = require('fs')
const p = require('path')
// home 地址
const homedir = require('os').homedir()
// home变量（系统地址）,用户可能在环境变量中修改了默认的HOME地址，所以我们推荐用下边这种获取 home 地址的方式实现
const home = process.env.HOME || homedir
const dbPath = p.join(home, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) return reject(error)
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const content = JSON.stringify(list)
            fs.writeFile(path, content + '\n', (error) => {
                if (error) return reject(error)
                resolve()
            })
        })
    }
}
module.exports = db
