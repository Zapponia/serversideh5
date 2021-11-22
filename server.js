//const { read } = require("fs");
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
        if(req.method === 'POST') {
        switch(req.url) {
            case '/user/createUser':
                con.query("INSERT INTO users (Username, Password) VALUES (?, ?)",['lmaoeren', 'test123'], function(err,data){
                    res.write(JSON.stringify(data));
                    res.end();
                });
              break;
            case '/user/editUser':
                con.query("UPDATE users SET Username = ? WHERE Username = ?",['lmao', 'test123'], function(err,data){
                    res.write(JSON.stringify(data));
                    res.end();
                });
              break;
            case '/user/getUsers':
                con.query("SELECT * FROM users", function(err,data) {
                    res.write(JSON.stringify(data));
                    res.end();
                });
                break;
                case '/user/editUser':
                    con.query("UPDATE users SET Username = 'test123' WHERE Username = 'test'", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                break;
                case '/user/deleteUser':
                    con.query("DELETE FROM users WHERE Username = ?",['lmao'], function(err,data){
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/createCharacter':
                    con.query("INSERT INTO Characters (name, userid, race, class, age, gender, description) VALUES ('test', 1, 'test123', 'test123', 21, 'female', 'testing')", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/editCharacter':
                    con.query("UPDATE Characters SET name = 'test123', race = 'test', class = 'test', age = 25, gender = 'male', description = 'testify' WHERE name = 'test'", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/deleteCharacter':
                    con.query("DELETE FROM Characters WHERE name = 'test123'", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                break;  
                default:
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Route Not Found'}))
            };
        } else if (req.method === 'GET') {
            switch(req.url) {
                case '/user/getUsers':
                    con.query("SELECT * FROM users", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/user/getUser':
                    // code block
                    break;
                case '/character/getCharacters':
                    con.query("SELECT * FROM Characters", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/getCharacter':
                    // code block
                break;
                default:
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Route Not Found'}))
            }
        }
    });
});

server.listen(8080);

/*

        if(req.method === 'GET') {
            con.query("SELECT * FROM users", function(err,data) {
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else if(req.url === '/add' && req.method === 'POST'){
            con.query("INSERT INTO users (Username, Password) VALUES ('test', 'test')", function(err,data){
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else if(req.method === 'PUT'){
            con.query("UPDATE users SET Username = 'test123' WHERE Username = 'test'", function(err,data){
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else if(req.url === '/remove' && req.method === 'DELETE'){
            con.query("DELETE FROM users WHERE Username = 'test'", function(err,data){
                res.write(JSON.stringify(data));
                res.end();
            }
        )} else{
            res.write(404)
            res.end(JSON.stringify({ message: 'Route Not Found'}))
        } 
*/