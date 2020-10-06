// Node Packages
const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
// Team Member .js Files
const Engineer = require("./lib/engineer");
const Intern  = require("./lib/intern");
const Manager = require("./lib/manager");
const { async } = require("rxjs");

// Wrap in an async function to ensure the correct timing for the inquirer prompts
async function initialize() {
    console.log("Let's create your development team!");

    // Set global variables
    let HTMLString = "";

    // Set function that calls main set of questions
    const mainQuestions = () => {
        const employeeQ = await inquirer.prompt([
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
                type:"input",
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
                type:"email",
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

    }
}

initialize();