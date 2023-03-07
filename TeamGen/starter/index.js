const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

promptManager();

function promptManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's employee ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the team manager's office number?",
        },
    ])
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            team.push(manager);
            promptTeamMembers();
        });
}

// Function to prompt user for team member information
function promptTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "New Team Member?",
            choices: [
                "Engineer",
                "Intern",
                "Finish building my team",
            ],
        },
    ])
        .then((answer) => {
            switch (answer.role) {
                case "Engineer":
                    promptEngineer();
                    break;
                case "Intern":
                    promptIntern();
                    break;
                case "Finish building my team":
                    const html = render(team);
                    fs.writeFileSync(outputPath, html);
                    console.log("Team created successfully!");
                    break;
            }
        });
}

// Function to prompt user for engineer information
function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's employee ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
        },
    ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            team.push(engineer);
            promptTeamMembers();
        });
}

// Function to prompt user for intern information
function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's employee ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?",
        },
    ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
            promptTeamMembers();
        })
};

