const Employee = require("../lib/employee");

// Test that it output is an object
test("Accepts an object argument", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(typeof testEmployee).toBe("object");
});

// Test that user can set the employee's name as first argument
test("Can set employee's name", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.name).toBe("testName");
});

// Test that user can set the employee's ID as second argument
test("Can set employee's ID", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.id).toBe(1);
});

// Test that user can set the employee's email as the third argument
test("Can set employee's email", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.email).toBe("janedoe@test.com");
});

// Test that user can get the name of an employee by calling the getName() function
test("Can get name from getName() function", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.getName()).toBe("testName");
});

// Test that user can get the ID of an employee by calling the getId() function
test("Can get ID from getId() function", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.getId()).toBe(1);
});

// Test that user can get the email of an employee by calling the getEmail() function
test("Can get email from getEmail() function", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.getEmail()).toBe("janedoe@test.com");
});

// Test that when user calls getRole() function, it returns 'Employee'
test("getRole() function returns 'Employee'", () => {
    const testEmployee = new Employee("testName",1,"janedoe@test.com");
    expect(testEmployee.getRole()).toBe("Employee");
});