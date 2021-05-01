INSERT INTO departments (dept_name)
VALUES ("Administration"), ("Sales"), ("Marketing"), ("Research & Development"), ("Quality Control"), ("Information Technology"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Receptionist", 28000, 1),
("Mailclerk", 28000, 1),
("Janitor", 28000, 1),
("Office Manager", 50000, 1),
("Sales Associate", 60000, 2),
("Sales Manager", 100000, 2),
("VP of Sales", 250000, 2),
("Graphic Designer", 60000, 3),
("Content Creator", 50000, 3),
("VP of Marketing", 250000, 3),
("R&D Assistant", 50000, 4),
("Product Developer", 175000, 4),
("R&D Writer", 75000, 4),
("Chief Science Officer", 275000, 4),
("QA Admin", 50000, 5),
("QC Coordinator", 75000, 5),
("VP of Quality", 375000, 5),
("Help Desk", 75000, 6),
("Developer", 90000, 6),
("Software Engineer", 90000, 6),
("VP of Technology", 390000, 6),
("Accountant", 100000, 7),
("Chief Finance Officer", 400000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Margaret", "Gyllenhal", 1, 4),
("Jacob", "Gyllenhal", 2, 5),
("Ryan", "Reynolds", 7, 4),
("Christopher", "Hemsworth", 17, 4),
("Robert", "Downey, Jr.", 14, 4),
("Gweneth", "Paltrow", 22, 5);