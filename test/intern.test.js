const Engineer = require("../lib/engineer");
const { test, expect } = require("@jest/globals");

// Test that user can set the intern's school
test("Can set engineer's GitHub school", () => {
    const testEmployee = new Engineer("testName",1,"janedoe@test.com","Test University");
    expect(testEmployee.github).toBe("Test University");
});

// Test user can retreive intern's school by calling the getSchool() function
test("Can get GitHub username with getSchool() function", () => {
    const testEmployee = new Engineer("testName",1,"janedoe@test.com","Test University");
    expect(testEmployee.getSchool()).toBe("Test University");
});

// Test that calling the getRole() function will now override and return 'Intern'
test("getRole() function now returns 'Intern'", () => {
    const testEmployee = new Engineer("testName",1,"janedoe@test.com","Test University");
    expect(testEmployee.getRole()).toBe("Intern");
});