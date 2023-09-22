//Global Variables
const mysql = require('mysql2');
const inquier = require('inquirer');
const startQuestions = require('./lib/main_menu');

function init(){
    startQuestions();//initialize the application
} 

init(); 