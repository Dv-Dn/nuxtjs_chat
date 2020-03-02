const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = require("./users")();

const message = (name, text, id) => ({ name, text, id });
io.on("connection", socket => {
  socket.on("userConnected", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("Data entered incorrectly");
    }

    socket.join(data.room);

    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });
    callback({ userId: socket.id });
    io.to(data.room).emit("updateUsers", users.getUsersByRoom(data.room));
    socket.emit(
      "newMessage",
      message(
        "Admin",
        `Welcome, ${data.name} !
    `
      )
    );
    socket.broadcast
      .to(data.room)
      .emit("newMessage", message("Admin", `User ${data.name} is connected.`));
  });

  socket.on("sendMessage", (data, callback) => {
    if (!data.text) {
      return callback("Text cannot be empty");
    }

    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit(
        "newMessage",
        message(user.name, data.text, data.id)
      );
      callback();
    }
  });
  socket.on("userLeft", (id, callback) => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getUsersByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        message("Admin", `User ${user.name} left.`)
      );
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getUsersByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        message("Admin", `User ${user.name} left.`)
      );
    }
  });
});

module.exports = {
  app,
  server
};
