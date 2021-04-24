## Real Easy CMS

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

- [Description ](#description)
- [Introduction ](#introduction)
- [Installation and Use](#installation-and-use)
- [License](#license)

# Introduction

This app utlizes mySQL and the Node.js environment to provide a simple solution to managing a CMS. The user interacts with the app via command line, which communicates with the database to retrieve the requested information; as well as add, delete, or update entries.

# Description

This CMS was built to be adaptable to any business structure. A MySQL database, simply titled "CMS" can be seeded with tables for Departments, Roles, and Employees. The CMS offers functionality to view staff info by Department, Roles, Employees, as well as Managers.

Additionally, it offers functionality to create, edit, and delete Employees, Departments, and Roles.
Finally, one can view the total utilized budget by Department.

All of this is achieved via the MySQL package, allowing Node.js to open a connection and send SQL commands to retireve data based on the user's input via the Inquirer prompts. Console.table is used to format the SQL response as a table in the command line.

This app is not deployed. However, to get a sense of its functionality, I have provided a demo video at the following link: https://drive.google.com/file/d/1hau_v2lmLkfmIDw07DwIVDZOZzYGthAT/view

# Installation and Use

Coming Soon

# License

[MIT License](https://opensource.org/licenses/MIT)
