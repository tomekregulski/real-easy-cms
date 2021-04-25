## Real Easy CMS

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

- [Description ](#description)
- [Introduction ](#introduction)
- [Installation and Use](#installation-and-use)
- [License](#license)

# Introduction

This is a Node.js application that utlizes MySQL and the Node.js environment to provide a simple Central Management System. The user interacts with the app via command line, which communicates with the database to retrieve the requested information; as well as add, delete, or update entries.

# Description

This CMS was built to be adaptable to any business structure. A MySQL database, simply titled "CMS" can be seeded with tables for Departments, Roles, and Employees. The CMS offers functionality to view staff info by Department, Roles, Employees, as well as Managers.

Additionally, it offers functionality to create, edit, and delete Employees, Departments, and Roles.
Finally, one can view the total utilized budget by Department.

All of this is achieved via the MySQL package, allowing Node.js to open a connection and send SQL commands to retireve data based on the user's input via the Inquirer prompts. Console.table is used to format the SQL response as a table in the command line.

This app is not deployed. However, to get a sense of its functionality, I have provided a demo video at the following link: https://drive.google.com/file/d/1hau_v2lmLkfmIDw07DwIVDZOZzYGthAT/view

# Installation and Use

You must have Node.js installed on your local machine, as well as MySQL and MySQL Workbench.

Once you have cloned this repository to a local directory, you need to set up the database in MySQL Workbench. You can do this by first copying running the code found in db/cms.sql to a new tab in your Workbench. This will create the database and its tables. Once this is done, copy and run the code found in db/seed.sql to load it with stock data. Or, you can model your own data accordingly to load that in.

Next, you need to install all dependencies by running:

```
npm i
```

You also need to set up config.js with your MySQL username and password, as such:

```
pass="yourPassword"
username="yourUsername"
```

You should now be ready to run the application from the command line. Initiate the program by running:

```
npm start
```

You will see the main menu, and can begin interacting with your database.

# License

[MIT License](https://opensource.org/licenses/MIT)
