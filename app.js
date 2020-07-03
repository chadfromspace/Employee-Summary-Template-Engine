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
const employeeObj = [];
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
//Initialize Inquirer
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
//Calling Initialize Inquirer Function
init();
//Write to file, duh.
function writeToFile() {
    const inputData = render(employeeObj);
    fs.appendFile(outputPath,inputData,(err)=>{if(err){console.log(err)}});
}