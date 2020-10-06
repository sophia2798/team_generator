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

// Function to create the member cards
const createCard = (role,name,id,email,uniqueProperty) => {
    // Read the correct HTML template
    const card = fs.readFile(`./templates/${role}.html`, "utf8");
    card = card.replace("name",name);
    card = card.replace("role",role);
    card = card.replace("ID",id);
    card = card.replace("Email",email);
    card =card.replace("Test",uniqueProperty);
    fs.appendFile("./output/team.html",card,function(err){
        if (err) throw err;
    });
    console.log("Member card has been added!")
};

// Function to generate team.html page
const createHTML = () => {
    // Retrieve main template
    const mainTemplate = fs.readFile("./templates/main.html", "utf8");
    // Write team page from main template
    const teamPage = fs.writeFile("./output/team.html",mainTemplate,function(err){
        if (err) throw err;
    });

    // Create cards from team array
    teamArray.forEach(member) {
        if(member.role === "Engineer") {
            createCard(member.getRole(),member.getName(),member.getId(),member.getEmail(),`GitHub Username: ${member.getGithub()}`);
        }
        if(member.role === "Intern") {
            createCard(member.getRole(),member.getName(),member.getId(),member.getEmail(),`School: ${member.getSchool()}`);
        }
        else {
            createCard(member.getRole(),member.getName(),member.getId(),member.getEmail(),`Office Number: ${member.getOfficeNumber()}`);
        }
    }

    // Append ending tags
    fs.appendFile("./output/team.html",`</div>
    </article>
    <!-- Buffer columns to center the content -->
    <div class="col-1">&nbsp</div>
    </section>
    </body>
    </html>`
    , function(err){
        if (err) throw err;
    });
}

mainQuestions();
