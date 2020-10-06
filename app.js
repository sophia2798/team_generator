// Node Packages
const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
// Team Member .js Files
const Engineer = require("./lib/engineer");
const Intern  = require("./lib/intern");
const Manager = require("./lib/manager");

console.log("Let's create your development team!");

// Set global variables
let HTMLString = "";
let teamArray = [];

// Set function that calls main set of questions
// Wrap in async function to wait for responses from employee questions before branching out into other role specific questions
async function mainQuestions() {
    const employeeQuestions = await inquirer.prompt([
        {
            type:"input",
            message:"Enter the employee's name",
            name: "name",
            validate: async (input) => {
                if (input === "") {
                    return "Please input a name"
                }
                return true;
            }
        },
        {
            type:"number",
            message:"Enter the employee's ID",
            name:"id",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "You must input a number"
                }
                return true;
            }
        },
        {
            type:"input",
            message:"Enter the employee's email",
            name:"email",
            validate: async (input) => {
                if(input.includes("@") === false || input.includes(".") === false) {
                    return "You must input a valid email"
                }
                return true;
            }
        },
        {
            type:"list",
            message:"Which of the following roles best describes this employee?",
            choices:["Engineer","Intern","Manager"],
            name:"role"
        }
    ]);

    // Display different set of questions depending on role of employee
    if (employeeQuestions.role === "Engineer") {
        inquirer.prompt(
            {
                type:"input",
                message:"What is this engineer's GitHub username?",
                name:"github"
            }
        ).then(response => {
            const newEmployee = new Engineer(employeeQuestions.name, employeeQuestions.id,employeeQuestions.email,response.github);
        });
    }
    else if (employeeQuestions.role === "Intern") {
        inquirer.prompt(
            {
                type:"input",
                message:"What school does this intern attend?",
                name:"school"
            }
        ).then(response => {
            const newEmployee = new Intern(employeeQuestions.name, employeeQuestions.id,employeeQuestions.email,response.school);
        });
    }
    else {
        inquirer.prompt(
            {
                type:"input",
                message:"What is the manager's office number?",
                name:"officeNumber"
            }
        ).then(response => {
            const newEmployee = new Manager(employeeQuestions.name, employeeQuestions.id,employeeQuestions.email,response.officeNumber);
        })
    }
    // Append this employee to an array of all team members
    teamArray.push(newEmployee);

    const addMore = await inquirer.prompt(
        {
            type:"list",
            message:"Would you like to add another team member?",
            choices:["Yes","No"],
            name:"addMore"
        }
    );

    // Conditionals to ask employee questions again if user wants to add another member, or build the HTML page if the user is done adding members
    if (addMore.addMore === "Yes") {
        console.log("==================");
        mainQuestions();
    }
    else {
        console.log("time to build the html",teamArray)
    }
}
mainQuestions();
