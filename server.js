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
        con.query("SELECT * FROM users", function(err,data) {
            res.write(JSON.stringify(data));
            res.end();
        });
    });
});

server.listen(8080);