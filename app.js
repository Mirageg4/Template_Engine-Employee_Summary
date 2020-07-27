const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Array to store employee info
const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// Name, ID, and E-mail
// What type of employee are you?

//employee type questions   
let typeQuestions = [{
        type: 'list',
        name: 'employeeOption',
        message: 'Confirm role of team member:',
        choices: ['Engineer', 'Intern', 'Manager']
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

//Engineer's questions    
let engineerQuestions = [{
    type: 'input',
    name: 'github',
    message: 'Enter GitHub username:'
}];

//Interns's questions
let internQuestions = [{
    type: 'input',
    name: 'school',
    message: 'Enter your school name:'
}];

//Engineer's questions
let managerQuestions = [{
    type: 'input',
    name: 'officeNumber',
    message: 'Enter Manager\'s office number:'
}];

//Engineer's role-profile
function createEngineer(name, email, id) {
    return inquirer.prompt(engineerQuestions)
        .then(({
            github
        }) => {

            let newEmployee = new Engineer(name, id, email, github)

            employees.push(newEmployee);

        });


}

//Intern's role-profile
function createIntern(name, id, email) {
    return inquirer.prompt(internQuestions)
        .then(({
            school
        }) => {

            let newEmployee = new Intern(name, id, email, school);

            employees.push(newEmployee);

        });
}

//Manager's role-profile
function createManager(name, email, id) {
    return inquirer.prompt(managerQuestions)
        .then(({
            officeNumber
        }) => {
            let newEmployee = new Manager(name, id, email, officeNumber);
    
            employees.push(newEmployee);

        });
}

function createTeam() {
    const htmlData = render(employees)

    fs.writeFileSync(outputPath, htmlData, function (err) {
        if (err) {
            return console.log(err)
        }
    })

}

//switch statement to assign role
async function main() {

    inquirer.prompt(typeQuestions).then(async({
        name,
        employeeId,
        email,
        employeeOption
    }) => {

        // switch statement to clarify question options
        switch (employeeOption) {
            case 'Engineer':
                await createEngineer(name, email, employeeId);
                break;
            case 'Intern':
                await createIntern(name, employeeId, email);
                break;
            case 'Manager':
                await createManager();
                break;
        }

        inquirer.prompt([{
            type: 'list',
            name: 'isComplete',
            choices: ['Yes', 'No'],
            message: "Is your team complete?"
        }]).then(({
            isComplete
        }) => {

            if (isComplete === "Yes") {
                createTeam(employees)
            } else {
                main()

            }


        })


    })
}

main()



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

//fs.writeFileSync(outputPath, htmlData)




// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```