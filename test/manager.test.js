const Manager = require("../lib/manager");
const { test, expect } = require("@jest/globals");

// Test that user can set the manager's office number
test("Can set engineer's GitHub username", () => {
    const testEmployee = new Manager("testName",1,"janedoe@test.com","testUsername");
    expect(testEmployee.github).toBe("testUsername");
});

// Test user can retreive manager's GitHub username by calling the getGithub() function
test("Can get GitHub username with getGithub() function", () => {
    const testEmployee = new Manager("testName",1,"janedoe@test.com","testUsername");
    expect(testEmployee.getGithub()).toBe("testUsername");
});

// Test that calling the getRole() function will now override and return 'Manager'
test("getRole() function now returns 'Manager'", () => {
    const testEmployee = new Manager("testName",1,"janedoe@test.com","testUsername");
    expect(testEmployee.getRole()).toBe("Manager");
});