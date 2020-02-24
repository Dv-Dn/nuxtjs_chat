var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("a user connected");
  setTimeout(() => {
    socket.on("sendMessage", data => {
      socket.emit("newMessage", {
        text: data.text + "SERVER"
      });
    });
  }, 1000);
});

module.exports = {
  app,
  server
};
