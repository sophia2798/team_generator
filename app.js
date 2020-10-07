// Node Packages
const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
// Team Member .js Files
const Engineer = require("./lib/engineer");
const Intern  = require("./lib/intern");
const Manager = require("./lib/manager");
// Async
const util = require("util")
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

console.log("Let's create your development team!");

// Set global variables
let HTMLString = "";
let teamArray = [];

// Set function that calls main set of questions
// Wrap in async function to wait for responses from employee questions before branching out into other role specific questions
async function mainQuestions() {
try {
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
    let newEmployee;
    // Display different set of questions depending on role of employee
    if (employeeQuestions.role === "Engineer") {
        await inquirer.prompt(
            {
                type:"input",
                message:"What is this engineer's GitHub username?",
                name:"github"
            }
        ).then(response => {
            newEmployee = new Engineer(employeeQuestions.name, employeeQuestions.id,employeeQuestions.email,response.github);
        });
    }
    else if (employeeQuestions.role === "Intern") {
        await inquirer.prompt(
            {
                type:"input",
                message:"What school does this intern attend?",
                name:"school"
            }
        ).then(response => {
            newEmployee = new Intern(employeeQuestions.name, employeeQuestions.id,employeeQuestions.email,response.school);
        });
    }
    else {
        await inquirer.prompt(
            {
                type:"input",
                message:"What is the manager's office number?",
                name:"officeNumber"
            }
        ).then(response => {
            newEmployee = new Manager(employeeQuestions.name, employeeQuestions.id,employeeQuestions.email,response.officeNumber);
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
        createHTML();
    }
}
catch (err) {
    console.log(err);
}
}

// Function to create the member cards
const createCard = (role,name,id,email,uniqueProperty) => {
    // Read the correct HTML template
    fs.readFile(`./templates/${role.toLowerCase()}.html`, "utf8", function(err,card){
        if (err) throw err;
        card = card.replace("name",name);
        card = card.replace("role",role);
        card = card.replace("ID",`ID: ${id}`);
        card = card.replace("Email",`Email: ${email}`);
        card =card.replace("Test",uniqueProperty);
        fs.appendFile("./output/team.html",card,function(err){
        if (err) throw err;
    });
    });
};

// Function to generate team.html page
async function createHTML() {
    try {
    // Retrieve main template
    let mainHTML = fs.readFileSync("./templates/main.html")
    // Write team page from main template
    fs.writeFileSync("./output/team.html",mainHTML,function(err){
    if (err) throw err;
    });
    // Create cards from team array
    teamArray.forEach(member => {
        if(member.getRole() === "Engineer") {
            createCard(member.getRole(),member.getName(),member.getId(),member.getEmail(),`GitHub Username: ${member.getGithub()}`);
        }
        else if(member.getRole() === "Intern") {
            createCard(member.getRole(),member.getName(),member.getId(),member.getEmail(),`School: ${member.getSchool()}`);
        }
        else {
            createCard(member.getRole(),member.getName(),member.getId(),member.getEmail(),`Office Number: ${member.getOfficeNumber()}`);
        }
    });
    }
    catch (err) {
        console.log(err)
    }
}

mainQuestions();
