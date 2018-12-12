DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Flubber44!';

CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("iPhone", "Electronics", 800.00, 100),
("PS4", "Electronics", 500.00, 50),
("XBOX One", "Electronics", 500.00, 50),
("Levi's 501", "Apparel", 34.99, 120),
("Men's T-Shirt", "Apparel", 14.99, 250),
("Women's Top", "Apparel", 7.99, 250),
("Timberland's", "Shoes", 124.99, 25),
("Nike's", "Shoes", 78.00, 50),
("Croc's", "Shoes", 35.00, 100),
("Smart Water", "Food", 2.99, 100);

SELECT *  FROM products;
