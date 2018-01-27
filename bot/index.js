const screenshot = require("./screenshot");
const api = require("./api");
const handleCommands = require("./commands");
const skills = require("./commands/skills");
const moment = require("moment");

const commands = [];
let lastCommand = moment().subtract(1, "hour");
let count = 0;

api.addListener(data => {
  lastCommand = moment();
  commands.push(data);
});

async function loop() {
  count++;
  // await skills.activateSkills([
  //   "SHADOW_CLONE",
  //   "WAR_CRY",
  //   "FIRE_SWORD",
  //   "HAND_OF_MIDAS",
  //   "DEADLY_STRIKES"
  // ]);

  // const randomTimeout = Math.floor(Math.random() * (240000 - 180000)) + 180000;
  // console.log("randomTimeout", randomTimeout);

  handleCommands(commands);

  if (count === 1000) {
    const secondsSinceLastCommand = moment().diff(lastCommand, "seconds");
    console.log("secondsSinceLastCommand", secondsSinceLastCommand);

    if (secondsSinceLastCommand < 15) {
      await screenshot.takeScreenshot([]);
    }

    count = 0;
  }

  setTimeout(loop, 1);
}

loop();
