# Professional Employee Tracker

## Description
This is a command-line content management systems (CMS) application to manage a company's employee Details. This application will enable  non-developers to easily manage and interact with information stored in databases.

User Story & Acceptance Criteria follow the AS AN / I WANT / SO THAT format.


## Table of Contents 
  
   * [User Story](#User-Story) 
  
   * [Acceptance Criteria](#Acceptance-Criteria)
  
   * [Technologies Used](#Technologies-Used) 
  
   * [Usage](#Usage) 

   * [Installation](#Installation) 

   * [Demo](#Demo) 

   * [Review](#Review) 
  
   * [License](#license) 


## User Story
AS A business owner
* I WANT to be able to view and manage the departments, roles, and employees in my company
    SO THAT I can organize and plan my business


## Acceptance Criteria

GIVEN a command-line application that accepts user input

* WHEN I start the application
    THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
    THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
    THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
    THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
    THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
    THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
    THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
    THEN I am prompted to select an employee to update and their new role and this information is updated in the database
* WHEN I choose to View the total utilized budget of a department
    THEN I am presented with a formatted table showing department names and department ids to chose from
    THEN I am presented with a utilized budget of that department


## Technologies Used
Node.js, Javascript and MySQL.


## Usage
A command-line application that at a minimum allows the user to:

* Add 
    *  departments
    *  roles
    *  employees
* View 
    *  departments
    *  roles
    *  employees
    *  employees by manager
    *  employees by department
    *  total utilized budget of a department
* Update 
    *  employee's roles
    *  employee's managers
* Delete 
    *  departments
    *  roles
    *  employees


## Installation
* This application need node.js, please refer to [offical website](https://nodejs.org/en/download/) for installation
* download this repo by running
    ```bash
    git clone https://github.com/SajithAravindan/Employee-Tracker_NjEjMS.git
    ```
* This application also need to install mysql on your computer, please refer to [mysql website](https://www.mysql.com/downloads/) for installation
* Change connection credentials in ```connection.js``` to your root/user/password of your mysql DBMS.
* install required node pacakges by running
    ```bash
    npm install
    ```
* Create schema of database tables by running all the queries in ```schema.sql```
* Set up test records yourself or run queries in ```seed.sql```
* start the application by running
    ```
    node index
    ```
  
## Demo

[![Watch the video](./imgs/demo.jpg)](https://drive.google.com/file/d/1ZFNPltmG4_qYzewmWywe_d9tOJ1Gy1UR/view)


Demo Video Link: https://drive.google.com/file/d/1ZFNPltmG4_qYzewmWywe_d9tOJ1Gy1UR/view


## License
* Please refer to the LICENSE in the repo. <a href="https://github.com/SajithAravindan/readme-generator-NJS/blob/main/LICENSE">(MIT License)</a>


---

Copyright (c) 2023 SajithAravindan.

