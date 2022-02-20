const program = require("commander");
const api = require('./index.js')

program
    .option('-m, --marshall', `I'm Marshall`)

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0, -1).join(' ')
        api.add(words).then(() => console.log('添加成功'), () => console.log('添加失败'))
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(() => console.log('清除成功'), () => console.log('清除失败'))
    });

program.parse(process.argv);

if (process.argv.length === 2) {
    // 说明用户直接运行了 node cli.js，可以打印 process.argv 一探究竟
    void api.showAll()
}
