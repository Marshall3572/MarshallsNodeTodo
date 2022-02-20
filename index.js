const program = require("commander");


program
    .option('-m, --marshall', 'i am marshall')

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const sentence = args.slice(0, -1).join(' ')
        console.log(sentence)
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {

    });

program.parse(process.argv);
