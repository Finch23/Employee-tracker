INSERT INTO department (name) 
VALUES ("Management"), ("Engineer"), ("Human Resources"), ("Sales"), ("Legal");


INSERT INTO role (title, salary, dep_id) 
VALUES ("General Manager", 60000, 1), ("Assistant Manager", 40000, 1), ("Senior Engineer", 70000, 2), ("Junior Engineer", 45000, 2), ("HR Coordinator", 50000, 3), ("Lead Sales", 50000, 4), ("Salesperson", 40000, 4), ("Attorney", 70000, 5);   

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Marshall", "Mathers", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Christopher", "Wallace", 2, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Tupac", "Shakur", 3, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Chef", "Raekwon", 4, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Method", "Man", 4, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Mac", "Miller", 5, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("A$AP", "Rocky", 6, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Andre", "3000", 7, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Danny", "Brown", 8, NULL);