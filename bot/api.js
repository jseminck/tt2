const fetch = require("node-fetch");
const moment = require("moment");

const io = require("socket.io-client")("http://188.226.164.164:3000/");
const SERVER = "http://188.226.164.164:12345/tt2/";

io.on("connect", () => {});

const listeners = [];

io.on("fe-to-bot", data => {
  listeners.forEach(listener => listener(data));
});

module.exports = {
  emit(message) {
    io.emit("bot-to-fe", {
      message
    });
  },

  addListener(listener) {
    listeners.push(listener);
  },

  async uploadImage(imageBase64) {
    return fetch(SERVER + "screenshot", {
      method: "POST",
      body: JSON.stringify({ imageBase64 }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => console.log("Screenshot uploaded"));
  }
};

function post(endpoint, body) {
  return fetch(SERVER + endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(() => {})
    .catch(err => {});
}
