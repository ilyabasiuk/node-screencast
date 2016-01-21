var http = require("http");
var server = new http.Server();
var debug = require("debug")("server");
//set DEBUG=server,server:* && node server.js

server.on("request", require("./request"));

server.listen(1377, "127.0.0.1");

debug("Server is running");