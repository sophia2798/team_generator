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
    if (mainQuestions.role === )
}
mainQuestions();
