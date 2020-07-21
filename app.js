const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// Name, ID, and E-mail
// What type of employee are you?

//Base employee questions
    let typeQuestions = [
        {
            type: 'list',
            name: 'employeeType',
            message: 'The role of the team member:',
            choices: [ 'Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter name of the team member:'
        },
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the employee ID number:',
            default: 'Employee'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the Team Member\'s email address:'
        }
    
    ];
    
   //Engineer's, Intern's, & Manager's questions
    
    let engineerQuestions = [
    
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:'
        }
    
    ];
    
    let internQuestions = [
    
        {
            type: 'input',
            name: 'school',
            message: 'Enter the Intern\'s school:'
        }
    
    ];

    let managerQuestions = [

        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the Manager\'s office number:'
        }
    
    ];

    function Questions(){
    inquirer.prompt(typeQuestions).then((response) => {
        if(response.employeeType === 'Engineer') {
            inquirer.prompt(engineerQuestions).then((engineerResponse) => {

                let name = response.name;
                let id = response.employeeId;
                let email = response.email;
                let github = engineerResponse.github;

                const engineer = new Engineer(name, id, email, github);

                employees.push(engineer);

                Questions();

            });
           
        } else if (response.employeeType === 'Intern') {
            inquirer.prompt(internQuestions).then((internResponse) => {

                let name = response.name;
                let id = response.employeeId;
                let email = response.email;
                let school = internResponse.school;

                const intern = new Intern(name, id, email, school);

                employees.push(intern);

                Questions();

            });
        }



    switch (employeeType) {
        case "Engineer":
            typeQuestions = engineerQuestions;
            break;
        case "Intern":
            typeQuestions = internQuestions;
            break;
        case "Manager":
            typeQuestions = managerQuestions;
            break;
    }

    inquirer.prompt(typeQuestions).then(() => {
        let newEmployee;
        
        switch (employeeType) {
        case "Engineer":
            newEmployee = new Engineer()
            break;
        case "Intern":
            newEmployee = new Intern()
            break;
        case "Manager":
            newEmployee = new Manager()
            break;
        }
        
        employees.push(newEmployee)
    })

})


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
const htmlData = "<p>Hello!</p>"

fs.writeFileSync(outputPath, htmlData)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
