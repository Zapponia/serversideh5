const { read } = require("fs");
var http = require("http");
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "mysql103.unoeuro.com",
    user: "zappstudios_dk",
    password: "AybwD5pcBmzf",
    database: "zappstudios_dk_db_serverside"
})

var server = http.createServer(function(req, res) {
    con.connect(function(err) {
        if(req.method === 'GET'){
            con.query("SELECT * FROM users", function(err,data) {
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else if(req.method === 'POST'){
            con.query("INSERT INTO users (Username, Password) VALUES ('test', 'test')", function(err,data){
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else if(req.method === 'PUT'){
            con.query("UPDATE users SET Username = 'test123' WHERE Username = 'test'", function(err,data){
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else if(req.method === 'DELETE'){
            con.query("DELETE FROM users WHERE Username = 'test'", function(err,data){
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else{
            res.write(404)
            res.end(JSON.stringify({ message: 'Route Not Found'}))
        }
    });
});

server.listen(8080);