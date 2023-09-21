# Professional Employee Tracker

## Description
This is a command-line content management systems (CMS) application to manage a company's employee Details. This application will enable  non-developers to easily manage and interact with information stored in databases.

As a User You can:
* Add departments, roles, employees (one row at a time)
* View departments, roles, employees
* Update employee roles
* Update employee managers
* View employees by manager
* Delete departments, roles, and employees (one row at a time) 

User Story & Acceptance Criteria follow the AS AN / I WANT / SO THAT format.

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


## Technologies Used
Node.js, Inquirer, and MySQL.

## Usage
A command-line application that at a minimum allows the user to:

Add departments, roles, employees (one row at a time)
View departments, roles, employees
Update employee roles
Update employee managers
View employees by manager
Delete departments, roles, and employees (one row at a time)

## Installation
* This application need node.js, please refer to [offical website](https://nodejs.org/en/download/) for installation
* download this repo by running
    ```bash
    git clone https://github.com/SajithAravindan/Employee-Tracker_NjEjMS.git
    ```
* This application also need to install mysql on your computer, please refer to [mysql website](https://www.mysql.com/downloads/) for installation
* Change password in ```index.js``` to your root user password of your mysql DBMS.
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
    or
    ```
    npm start
    ```

## Demo

[![Watch the video](./imgs/demo.jpg)]()

## Review

GitHub Repository: https://github.com/SajithAravindan/Employee-Tracker_NjEjMS.git

Demo Video Link: 

## License
* Please refer to the LICENSE in the repo. <a href="https://github.com/SajithAravindan/readme-generator-NJS/blob/main/LICENSE">(MIT License)</a>


---

Copyright (c) 2023 SajithAravindan.

