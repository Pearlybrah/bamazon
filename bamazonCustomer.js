const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "Flubber44!",

    database: "bamazonDB"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    console.log("\n\n");
    console.log("\n-----------Please select an Item Id to purchase from--------------\n");
    displayProducts();
});

const displayProducts = () => {
    connection.query ("SELECT id, product_name, price, stock_quantity FROM products",
    function(error, results) {
        if (error) throw error;
        console.table(results);
        purchase();
    });
}

const purchase = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
        {
            type: "input",
            message: "Enter the item_Id you would like to purchase from the list",
            name: "item_Id"
        },
        {
            type: "input",
            message: "How many units would you like to purchase?",
            name: "stock"
        }])
        .then(function(answer) {
            let updateId = parseInt(parseInt(answer.item_Id) - 1);
            let updatePrice = parseInt(answer.stock) * res[updateId].price;

            if (parseInt(answer.stock) <= res[updateId].stock_quantity) {
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: (parseInt(res[updateId].stock_quantity) - answer.stock)
                    },
                    {
                        id: answer.item_Id
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("\n-----Thank you for your purchase!-----");
                    console.log("\nYour Total is: $" + updatePrice.toFixed(2) + "-----------");
                    connection.end();
                });
            }
            else {
                console.log("\n-----Your order quantity was too high, please lower your quantity to continue....--------\n");
                purchase();
            }
        });
    });
};
