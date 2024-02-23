import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.bgBlue('******  Quiz  *******'));
let api = "https://opentdb.com/api.php?amount=3&category=19&difficulty=medium&type=multiple";
let fetchData = async (data) => {
    let fetchQuestions = await fetch(data);
    let res = await fetchQuestions.json();
    return res.results;
};
let data = await fetchData(api);
let quiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter your name: '
    });
    console.log();
    for (let i = 0; i < 3; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: 'list',
            name: 'quiz',
            message: chalk.redBright(data[i].question),
            choices: answer.map((val) => val)
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.green('Correct Answer'));
            console.log('--------------------------------------------------------------------------');
        }
        else {
            console.log(chalk.green(`Wrong Answer. Correct answer is ${data[i].correct_answer}`));
            console.log('--------------------------------------------------------------------------');
        }
    }
    console.log();
    console.log(chalk.bgBlueBright(`${name.name} your score is ${score} out of 3`));
};
quiz();
