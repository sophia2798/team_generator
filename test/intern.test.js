const Intern = require("../lib/intern");
const { test, expect } = require("@jest/globals");

// Test that user can set the intern's school
test("Can set intern's GitHub school", () => {
    const testEmployee = new Intern("testName",1,"janedoe@test.com","Test University");
    expect(testEmployee.school).toBe("Test University");
});

// Test user can retreive intern's school by calling the getSchool() function
test("Can get school name with getSchool() function", () => {
    const testEmployee = new Intern("testName",1,"janedoe@test.com","Test University");
    expect(testEmployee.getSchool()).toBe("Test University");
});

// Test that calling the getRole() function will now override and return 'Intern'
test("getRole() function now returns 'Intern'", () => {
    const testEmployee = new Intern("testName",1,"janedoe@test.com","Test University");
    expect(testEmployee.getRole()).toBe("Intern");
});