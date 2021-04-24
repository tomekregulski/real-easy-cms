DROP DATABASE IF EXISTS CMS;

CREATE DATABASE CMS;

USE CMS;

CREATE TABLE departments(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) -- department name
);

CREATE TABLE roles(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30), -- role title
  salary DECIMAL,
  department_id INT -- ref to department
);

CREATE TABLE employees(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INT, -- ref to employee role
  manager_id INT, -- ref to another employee (manager)
);
