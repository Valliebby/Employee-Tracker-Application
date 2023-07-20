use employees;

INSERT INTO department (name)
VALUES ("HR"),
       ("Data Science"),
       ("Services"),
       ("UI"),
       ("Marketing"),
       ("Design"),
       ("Cloud Development");
       INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 80000, 2),
       ("Web developer", 90000, 7),
       ("Sales", 100000, 5),
       ("UX UI", 100000, 4),
       ("Marketer", 85000, 5),
       ("Graphic Designer", 90000, 7),
       ("Developer", 100000, 7);
       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob","Smith", 2, NULL),
       ("James", "Cole",3, 1),
       ("Rick", "Noble",4, 2),
       ("Sam", "Kirbby",5, 1);
