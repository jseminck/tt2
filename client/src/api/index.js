import io from "socket.io-client";

const socket = io("http://localhost:3000");

const messageListeners = {};

socket.on("connect", () => {
  socket.on("bot-to-fe", ({ message }) => {
    messageListeners[message]();
  });
});

export default {
  on(message, fn) {
    messageListeners[message] = fn;
  },

  emit(message, args) {
    socket.emit("fe-to-bot", {
      message,
      ...args
    });
  }
};
