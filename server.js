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
                var buffer = "";
                var params = [];
                req.on("data", function(chunk) {
                    buffer += chunk;
                });
                req.on("end", function(){
                    var sp = buffer.split('&');
                    for (var i = 0; i < sp.length; i++) {
                        var sub = sp[i].split('=');
                        for (var j = 0; j < sub.length; j++) {
                            params.push(sub[j]);
                        }
                    }
                    con.query("INSERT INTO users (Username, Password) VALUES (?, ?)",[params[1], params[3]], function(err,data){
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                });
              break;
                case '/user/editUser':
                    var buffer = "";
                    var params = [];
                    req.on("data", function(chunk) {
                        buffer += chunk;
                    });
                    req.on("end", function(){
                        var sp = buffer.split('&');
                        for (var i = 0; i < sp.length; i++) {
                            var sub = sp[i].split('=');
                            for (var j = 0; j < sub.length; j++) {
                                params.push(sub[j]);
                            }
                        }
                        con.query("UPDATE users SET Username = ? WHERE ID = ?",[params[1], parseInt(params[3])], function(err,data) {
                            res.write(JSON.stringify(data));
                            res.end();
                        });
                    });
                break;
                case '/user/deleteUser':
                    var buffer = "";
                    var params = [];
                    req.on("data", function(chunk) {
                        buffer += chunk;
                    });
                    req.on("end", function(){
                        var sp = buffer.split('&');
                        for (var i = 0; i < sp.length; i++) {
                            var sub = sp[i].split('=');
                            for (var j = 0; j < sub.length; j++) {
                                params.push(sub[j]);
                            }
                        }
                        con.query("DELETE FROM users WHERE ID = ?",[parseInt(params[1])], function(err,data){
                            res.write(JSON.stringify(data));
                            res.end();
                        });
                    });
                    break;
                case '/character/createCharacter':
                    con.query("INSERT INTO Characters (name, userid, race, class, age, gender, description) VALUES (?, ?, ?, ?, ?, ?,?)",['test', 1, 'test123', 'test123', 21, 'female', 'testing'], function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/editCharacter':
                    con.query("UPDATE Characters SET name = ?, race = ?, class = ?, age = ?, gender = ?, description = ? WHERE name = ?",['test123', 'test', 'test', 25, 'male', 'testify', 'test'], function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/deleteCharacter':
                    con.query("DELETE FROM Characters WHERE name = ?",['jaej'], function(err,data) {
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
                    con.query("SELECT * FROM users WHERE id = ?", [1], function(err,data){
                        res.write(JSON.stringify(data));
                        res.end();
                    })
                    break;
                case '/character/getCharacters':
                    con.query("SELECT * FROM Characters", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/character/getCharacter':
                    con.query("SELECT * FROM Characters WHERE id = ?", [1], function(err,data){
                        res.write(JSON.stringify(data));
                        res.end();
                    })
                break;
                default:
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Route Not Found'}))
            }
        }
    });
});

server.listen(8080);