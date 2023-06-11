'use strict'

import chalk from 'chalk'
import boxen from 'boxen'
import clear from 'clear'
import inquirer from 'inquirer'
import Enquirer from 'enquirer'
import open from 'open'
import terminalImage from 'terminal-image';

// clear the terminal before showing the npx card
clear()

const data = {
    name: chalk.bold.green("@salad"),
    github: chalk.hex('#787878')("https://github.com/s-alad"),
    npx: chalk.hex('#787878')("npx salad"),
    labelGitHub: chalk.hex('#9E9E9E').bold("git:"),
    labelCard: chalk.hex('#9E9E9E').bold("npm:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelGitHub} ${data.github}`,
        `${data.labelCard} ${data.npx}`,
        ``,
        `${chalk(
            "omnia mea mecom porto."
        )}`,
        `${chalk.italic("all that is mine, I carry with me.")}`,
    ].join("\n"),
    {
        margin: 0,
        /* float: 'center', */
        padding: {
            top: 1,
            bottom: 1,
            right: 2,
            left: 2
        },
        borderStyle: "double",
        borderColor: "white"
    }
);

// Show the boxen
console.log(me);

const options = {
    type: "list",
    name: 'actions',
    message: 'select action',
    choices: [
        {
            name: `send an ${chalk.bold("email")}?`,
            value: () => {
                open("mailto:ssalad@skiff.com");
                console.log("I'll respond if you're interesting.");
            }
        },
        {
            name: 'ping',
            value: () => {
                console.log(chalk.bold.green("pong"));
            }
        },
        {
            name: `standing cat`,
            value: async () => {
                open("https://www.youtube.com/watch?v=5nxY9rMaE50&ab_channel=Bara");
                console.log(await terminalImage.file('./assets/gato.png'));
                console.log("can anyone tell me if this cat is okay?\nits a bit strange hes in a bird cage");
            }
        },
        {
            name: 'the tower of babel',
            value: async () => {
                console.log(await terminalImage.file('./assets/tower.jpg'));
            }
        },
        'exit'

    ]
}

function main() {
    inquirer.prompt(options).then(async answer => {
        if (answer.actions == "exit") {
            return;
        } else {
            console.log('-'.repeat(40))
            await answer.actions();
            console.log('-'.repeat(40))

            Enquirer.prompt({
                type: "toggle",
                name: "again",
                message: "exit?",
                default: false
            }).then(answer => {
                if (answer.again == false) {
                    main();
                }
            });
        }
    });
}

main();