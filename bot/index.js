const screenshot = require("./screenshot");
const api = require("./api");
const handleCommands = require("./commands");
const skills = require("./commands/skills");
const playarea = require("./commands/playarea");
const asyncSleep = require("./util/asyncSleep");
const mouseUtils = require("./util/mouseUtils");
const { TOP_LEFT_X, TOP_LEFT_Y } = require("./constants");
const moment = require("moment");

const commands = [];
let lastCommand = moment().subtract(1, "hour");
let count = 1;
let activateSkills = 0;

api.addListener(data => {
  lastCommand = moment();
  commands.push(data);
});

async function clanQuest() {
  const CLAN = { x: TOP_LEFT_X + 90, y: TOP_LEFT_Y + 30 };
  const CLAN_QUEST = { x: TOP_LEFT_X + 100, y: TOP_LEFT_Y + 850 };
  const FIGHT = { x: TOP_LEFT_X + 355, y: TOP_LEFT_Y + 870 };
  const ACCEPT_DIAMOND = { x: TOP_LEFT_X + 370, y: TOP_LEFT_Y + 520 };
  const CLOSE_CLAN_QUEST = { x: TOP_LEFT_X + 475, y: TOP_LEFT_Y + 55 };

  mouseUtils.click(CLAN, 1, 5);
  await asyncSleep(1000 + Math.random() * 500);
  mouseUtils.click(CLAN_QUEST, 1, 5);
  await asyncSleep(2000 + Math.random() * 500);
  mouseUtils.click(FIGHT, 1, 5);
  await asyncSleep(1000 + Math.random() * 500);
  mouseUtils.click(ACCEPT_DIAMOND, 1, 5);
  await asyncSleep(3000 + Math.random() * 500);

  await playarea.tap(200, 40);

  await asyncSleep(2000 + Math.random() * 500);
  mouseUtils.click(CLOSE_CLAN_QUEST, 1, 5);
  await asyncSleep(2000 + Math.random() * 500);
  mouseUtils.click(CLOSE_CLAN_QUEST, 1, 5);
  await asyncSleep(1000 + Math.random() * 500);
}

async function loop() {
  count++;
  handleCommands(commands);

  if (count % 1000 === 0) {
    const secondsSinceLastCommand = moment().diff(lastCommand, "seconds");
    console.log("secondsSinceLastCommand", secondsSinceLastCommand);

    if (secondsSinceLastCommand < 15) {
      await screenshot.takeScreenshot([]);
    }
  }

  if (count === activateSkills) {
    skills.activateSkills([
      "SHADOW_CLONE",
      "WAR_CRY",
      "FIRE_SWORD",
      "DEADLY_STRIKES"
    ]);

    activateSkills = Math.floor(Math.random() * (210000 - 180000)) + 180000;
    console.log("activateSkills", activateSkills);

    count = 0;
  }

  setTimeout(loop, 1);
}

loop();
