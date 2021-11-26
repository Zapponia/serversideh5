//const { read } = require("fs");
var http = require("http");
const { url } = require("inspector");
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
                        con.query("INSERT INTO Characters (name, userid, race, class, age, gender, description) VALUES (?, ?, ?, ?, ?, ?,?)",[params[1], parseInt(params[3]), params[5], params[7], parseInt(params[9]), params[11], params[12]], function(err,data) {
                            res.write(JSON.stringify(data));
                            res.end();
                        });
                    });
                    break;
                case '/character/editCharacter':
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
                        con.query("UPDATE Characters SET name = ?, race = ?, class = ?, age = ?, gender = ?, description = ? WHERE id = ?",[params[1], params[3], params[5], parseInt(params[7]), params[9], params[11], parseInt(params[13])], function(err,data) {
                            res.write(JSON.stringify(data));
                            res.end();
                        });
                    });
                    break;
                case '/character/deleteCharacter':
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
                        con.query("DELETE FROM Characters WHERE ID = ?",[parseInt(params[1])], function(err,data) {
                            res.write(JSON.stringify(data));
                            res.end();
                        });
                    });
                break;  
                default:
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Route Not Found'}))
            };
        } else if (req.method === 'GET') {
            var url = req.url.split('?')
            switch(url[0]) {
                case '/user/getUsers':
                    con.query("SELECT * FROM users", function(err,data) {
                        res.write(JSON.stringify(data));
                        res.end();
                    });
                    break;
                case '/user/getUser':
                    con.query("SELECT * FROM users WHERE id = ?", [parseInt(url[1])], function(err,data){
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
                    con.query("SELECT * FROM Characters WHERE id = ?", [parseInt(url[1])], function(err,data){
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