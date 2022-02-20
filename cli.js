const program = require("commander");
const api = require('./index.js')

program
    .option('-m, --marshall', 'i am marshall')

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        api.add(...args)
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear()
    });

program.parse(process.argv);
