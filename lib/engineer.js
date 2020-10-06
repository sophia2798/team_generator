// Require the employee.js file as the engineer class will extend from the employee class
const Employee = require("./employee");

class Engineer extends Employee {
    constructor(github) {
        super(name,id,email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;