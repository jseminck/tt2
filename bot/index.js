const screenshot = require("./screenshot");
const api = require("./api");
const handleCommands = require("./commands");

const commands = [];
api.addListener(data => {
  commands.push(data);
});

async function loop() {
  handleCommands(commands);
  await screenshot.takeScreenshot([]);

  setTimeout(loop, 1000);
}

loop();
