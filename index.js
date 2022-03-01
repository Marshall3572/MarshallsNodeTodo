const db = require("./db");
const inquirer = require('inquirer')

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

const markAsDone = (list, index) => {
    list[index].done = true
    void db.write(list)
}
const markAsUndone = (list, index) => {
    list[index].done = false
    void db.write(list)
}
const updateTitle = (list, index) => {
    inquirer.prompt({
        type: 'input', name: 'title', message: '请输入新标题'
    }).then(answer3 => {
        list[index].title = answer3.title
        void db.write(list)
    })
}
const remove = (list, index) => {
    list.splice(index, 1)
    void db.write(list)
}

const askForAction = (list, index) => {
    const actions = {markAsUndone, markAsDone, updateTitle, remove}
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [{name: '退出', value: 'quit'}, {name: '已完成', value: 'markAsDone'}, {
            name: '未完成', value: 'markAsUndone'
        }, {name: '删除', value: 'remove'}, {name: '修改标题', value: 'updateTitle'},]
    }).then(answer2 => {
        const action = actions[answer2.action]
        action && action(list, index)
    })
}

const askForCreateTask = (list) => {
    inquirer.prompt({
        type: 'input', name: 'title', message: '请输入新任务标题'
    }).then(answer => {
        list.push({
            title: answer.title, done: false
        })
        void db.write(list)
    })
}

const printTasks = (list) => {
    // printTask
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务',
            choices: [{name: '退出', value: '-1'}, ...list.map((task, index) => {
                return {name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString()}
            }), {name: '+ 创建新任务', value: '-2'}]
        },)
        .then((answer) => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                askForAction(list, index)
            } else if (index === -2) {
                askForCreateTask(list)
            }
        });
}

module.exports.showAll = async () => {
    // 读取之前的任务
    const list = await db.read()
    if (JSON.stringify(list) === '[]') console.log('暂时没有任务要做')
    printTasks(list)
}

