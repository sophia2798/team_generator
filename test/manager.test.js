const Manager = require("../lib/manager");
const { test, expect } = require("@jest/globals");

// Test that user can set the manager's office number
test("Can set manager's office number", () => {
    const testEmployee = new Manager("testName",1,"janedoe@test.com",101);
    expect(testEmployee.github).toBe(101);
});

// Test that calling the getRole() function will now override and return 'Manager'
test("getRole() function now returns 'Manager'", () => {
    const testEmployee = new Manager("testName",1,"janedoe@test.com",101);
    expect(testEmployee.getRole()).toBe("Manager");
});