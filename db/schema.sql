drop database if exists employeedb;

create database employeedb;

use employeedb;

create table department(
	dep_id int auto_increment,
    name varchar(30) null,
    primary key(dep_id)
);

create table roles (
	role_id int auto_increment,
    title varchar(30) null,
    salary decimal(10, 4),
    dep_id int,
    primary key(role_id),
    foreign key(dep_id) references department(dep_id) on delete cascade
);

create table employee(
	employee_id int auto_increment,
    first_name varchar(30) null,
    last_name varchar(30) null,
    role_id int,
    manager_id int,
    primary key(employee_id),
    foreign key(role_id) references role(role_id) on delete cascade
);

ALTER TABLE employee
ADD FOREIGN KEY(manager_id)
REFERENCES employee(employee_id)
ON DELETE SET NULL;