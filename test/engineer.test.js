const Engineer = require("../lib/engineer");
const { test, expect } = require("@jest/globals");

// Test that user can set the engineer's GitHub username
test("Can set engineer's GitHub username", () => {
    const testEmployee = new Engineer("testName",1,"janedoe@test.com","testUsername");
    expect(testEmployee.github).toBe("testUsername");
});

// Test user can retreive engineer's GitHub username by calling the getGithub() function
test("Can get GitHub username with getGithub() function", () => {
    const testEmployee = new Engineer("testName",1,"janedoe@test.com","testUsername");
    expect(testEmployee.getGithub()).toBe("testUsername");
});

// Test that calling the getRole() function will now override and return 'Engineer'
test("getRole() function now returns 'Engineer'", () => {
    const testEmployee = new Engineer("testName",1,"janedoe@test.com","testUsername");
    expect(testEmployee.getRole()).toBe("Engineer");
});