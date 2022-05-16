// Included libraries...
const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");




// Starts the backend...
module.exports.run = async () =>
{
    // Runs the app in port 3000...
    const app = express();
    const port = 3000;

    app.use(bodyparser.json());
    app.listen(port, () => console.log("Running app in http://localhost:"+port+"/"));
    app.get("/", (request, response) => response.send("Running bot online..."));

    // Starts the database connection...
    var connection = mysql.createConnection(
    {
        host: "localhost",
        // port: 3000,
        user: "root",
        database: "lzc",
        password: "¡La Zona Cero!",
        multipleStatements: true
    });
    connection.connect((error) =>
    {
        if (!error)
        {
            console.log("Connected correctly to the database! :D");
        }
        else
        {
            console.log("Cannot connect to the database! D:\n"+
            JSON.stringify(error, undefined, 2));
        }
    });




    // API commands //
    
    // SELECT ACHIEVEMENTS //
    app.get("/achievements/:userID", (request, response) =>
    {
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // response.setHeader("Access-Control-Allow-Credentials", true);

        connection.query("SELECT achievements FROM members WHERE id = ?", [request.params.userID], (error, rows, fields) =>
        {
            if (!error) response.send(rows);
            else response.send(error);
        });
    });

    // SELECT CALENDAR //
    app.get("/calendar", (request, response) =>
    {
        connection.query("SELECT url FROM calendar", (error, rows, fields) =>
        {
            if (!error) response.send(rows);
            else response.send(error);
        });
    });
};