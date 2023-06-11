'use strict'

import chalk from 'chalk'
import boxen from 'boxen'
import clear from 'clear'
import inquirer from 'inquirer'
import Enquirer from 'enquirer'
import open from 'open'
import terminalImage from 'terminal-image';
import fs from 'fs';
import term from 'terminal-kit';
import playSound from 'play-sound'
import {username} from 'username';


// clear the terminal before showing the npx card
clear()

process.stdin.resume();//so the program will not close instantly
var audio;
let user = await username();
function exitHandler() {
    if (audio) audio.kill();
    process.exit();
}

//do something when app is closing
process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);




const data = {
    name: chalk.bold.green("@sa1ad"),
    github: chalk.hex('#787878')("https://github.com/s-alad"),
    npx: chalk.hex('#787878')("npx sa1ad"),
    email: chalk.hex('#787878')("ssalad@skiff.com"),
    xmr: chalk.hex('#787878')('43y7TPFZzfET5m7J9EUMjzX1Fg2zZTs367nufk5h49Z6F8C7n3BPppr4ZshsmWWxvySnX7LAJLdSRZjFXD9Dydg24gRj36F'),

    labelGitHub: chalk.hex('#9E9E9E').bold("git:"),
    labelEmail: chalk.hex('#9E9E9E').bold("eml:"),
    labelCard: chalk.hex('#9E9E9E').bold("npm:"),
    labelXMR: chalk.hex('#9E9E9E').bold("xmr:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelGitHub} ${data.github}`,
        `${data.labelCard} ${data.npx}`,
        `${data.labelEmail} ${data.email}`,
        /* `${data.labelXMR} ${data.xmr}`, */
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

console.log(me);
console.log()

const options = {
    type: "list",
    name: 'actions',
    message: 'select action',
    choices: [
/*         {
            name: `send an email`,
            value: () => {
                open("mailto:ssalad@skiff.com");
                console.log("I'll respond if you're interesting.");
            }
        }, */
        {
            name: '| poem',
            value: async () => {

                let e = await Enquirer.prompt({
                    type: "toggle",
                    name: "poem",
                    message: "the poem is 10 minutes long, continue?\n",
                    default: true
                })

                if (e.poem == false) {
                    return ;
                }
                console.log()
                

                //play sound
                const player = playSound();
                audio = player.play('./assets/alpha.mp3', function(err){
                    if (err && !err.killed) throw err
                });


                const raw = fs.readFileSync('poem.txt', 'utf8');
                //replace all instances of sa1ad with user
                const replaced = raw.replace(/sa1ad/g, user);

                //split into lines
                const poem = replaced.split('\n');


                //read in poem.txt into list of lines
                /* const poem = fs.readFileSync('poem.txt', 'utf8').split('\n'); */

                //10 mins divided by number of lines
                const timeBetweenLines = (10 * 60 * 1000) / poem.length;

                //print each line with a delay
                for (let i = 0; i < poem.length; i++) {
                    
                    let currentLine = poem[i];
                    
                    let t = term.terminal;
                    let final = t.wrapColumn({width: 40});
                    t.wrap(currentLine);
                    t( '\n' ) ;

                    //print each line with a delay
                    //console.log(final);

                    await new Promise(resolve => setTimeout(resolve, (
                        /* currentLine.length < 16 ? 700 : 1000  */
                        timeBetweenLines
                    )));
                }
            }
        },
        {
            name: `| cat`,
            value: async () => {
                open("https://www.youtube.com/watch?v=5nxY9rMaE50&ab_channel=Bara");
                console.log(await terminalImage.file('./assets/gato.png',{width: 40}));
                console.log("can anyone tell me if this cat is okay?\nits a bit strange hes in a bird cage");
            }
        },
        {
            name: '| babel',
            value: async () => {
                console.log(await terminalImage.file('./assets/tower.jpg',{width: 40}));
                //console log above with wrap using terminal-kit
                console.log('By the rivers of Babylon, there we sat \ndown, yea, we wept. \nRaze it, raze it, even to the foundation.\nO daughter of Babylon. who art thou?')
            }
        },
        {
            name: '| world',
            value: async () => {
                console.log(await terminalImage.file('./assets/world.JPG',{width: 40}));
                console.log('la mond est a nous')
            }
        },
        '- exit'

    ]
}

function main() {
    inquirer.prompt(options).then(async answer => {
        if (answer.actions == "- exit") {
            return;
        } 
        else {
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