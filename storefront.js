const mysql = require("mysql");

var connection = mysql.createConnection ({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "Flubber44!",

    databse: "bamazonDB"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    
    //insert run bamazon product display function
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }