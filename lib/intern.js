// Require the employee.js file as the intern class will extend from the employee class
const Employee = require("./employee");

class Intern extends Employee {
    constructor(name,id,email,school) {
        super(name,id,email);
        this.school = school;
    }
    
    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;