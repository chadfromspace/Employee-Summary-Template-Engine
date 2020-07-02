const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const questions = [
    {
        type: 'list',
        message: 'Do you want to add a Manager, an Engineer, or an Intern to your team?',
        name: 'employeeType',
        choices: ['Manager','Engineer','Intern']
    },
    //Manager Questions
    {
        when: (response)=>{
            return response.employeeType==='Manager';
        },
        type: 'input',
        message: 'Name:',
        name: 'managerName'
    },
    {
        when: (response)=>{
            return response.employeeType==='Manager';
        },
        type: 'input',
        message: 'Employee ID:',
        name: 'managerID'
    },
    {
        when: (response)=>{
            return response.employeeType==='Manager';
        },
        type: 'input',
        message: 'Email:',
        name: 'managerEmail'
    },
    {
        when: (response)=>{
            return response.employeeType==='Manager';
        },
        type: 'input',
        message: 'Office Number:',
        name: 'officeNumber'
    },
    //Engineer Questions
    {
        when: (response)=>{
            return response.employeeType==='Engineer';
        },
        type: 'input',
        message: 'Name:',
        name: 'engineerName'
    },
    {
        when: (response)=>{
            return response.employeeType==='Engineer';
        },
        type: 'input',
        message: 'Employee ID:',
        name: 'engineerID'
    },
    {
        when: (response)=>{
            return response.employeeType==='Engineer';
        },
        type: 'input',
        message: 'Email:',
        name: 'engineerEmail'
    },
    {
        when: (response)=>{
            return response.employeeType==='Engineer';
        },
        type: 'input',
        message: 'GitHub:',
        name: 'github'
    },
    //Intern Questions
    {
        when: (response)=>{
            return response.employeeType==='Intern';
        },
        type: 'input',
        message: 'Name:',
        name: 'internName'
    },
    {
        when: (response)=>{
            return response.employeeType==='Intern';
        },
        type: 'input',
        message: 'Employee ID:',
        name: 'internID'
    },
    {
        when: (response)=>{
            return response.employeeType==='Intern';
        },
        type: 'input',
        message: 'Email:',
        name: 'internEmail'
    },
    {
        when: (response)=>{
            return response.employeeType==='Intern';
        },
        type: 'input',
        message: 'School:',
        name: 'school'
    },
    //Add another employee prompt
    {
        type: 'confirm',
        message: 'Add another employee?',
        name: 'addEmployee'
    }
];
const employeeObj = [];

init();

//Function to run in the initialization that accepts the file name and the response data as parameters.

//function writeToFile(fileName, data) {
//    const inputData = md(data);
//    fs.appendFile(fileName,inputData,(err)=>{if(err){console.log(err)}});
//}

function init(){
    inquirer.prompt(questions)
    .then((response) => {
        if(response.addEmployee){
            if(response.employeeType==='Manager'){
                const newEmployeeObject = new Manager(response.managerName,response.managerID,response.managerEmail,response.officeNumber);
                employeeObj.push(newEmployeeObject);
            }
            if(response.employeeType==='Engineer'){
                const newEmployeeObject = new Engineer(response.engineerName,response.engineerID,response.engineerEmail,response.github);
                employeeObj.push(newEmployeeObject);
            }
            if(response.employeeType==='Intern'){
                const newEmployeeObject = new Intern(response.internName,response.internID,response.internEmail,response.school);
                employeeObj.push(newEmployeeObject);
            }
            init();
        } else if(!response.addEmployee){
                if(response.employeeType==='Manager'){
                    const newEmployeeObject = new Manager(response.managerName,response.managerID,response.managerEmail,response.officeNumber);
                    employeeObj.push(newEmployeeObject);
                }
                if(response.employeeType==='Engineer'){
                    const newEmployeeObject = new Engineer(response.engineerName,response.engineerID,response.engineerEmail,response.github);
                    employeeObj.push(newEmployeeObject);
                }
                if(response.employeeType==='Intern'){
                    const newEmployeeObject = new Intern(response.internName,response.internID,response.internEmail,response.school);
                    employeeObj.push(newEmployeeObject);
                }
                writeToFile();
        }
    })
    .catch((err)=>{console.log(err)});
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function writeToFile() {
    const inputData = render(employeeObj);
    fs.appendFile('team.html',inputData,(err)=>{if(err){console.log(err)}});
}
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
