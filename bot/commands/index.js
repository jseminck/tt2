const robot = require("robotjs");
const mouseUtils = require("../util/mouseUtils");
const api = require("../api");
const screenshot = require("../screenshot");
const asyncSleep = require("../util/asyncSleep");
const moment = require("moment");
const { TOP_LEFT_X, TOP_LEFT_Y, FIRST_MENU_BUTTON } = require("../constants");

// const skills = require("./skills");
// const heroes = require("./heroes");
// const emulator = require("./emulator");
// const playarea = require("./playarea");
// const analyzeScreen = require("./analyzeScreen");
// const state = require("./state");

module.exports = async function handleCommands(commands) {
  // const uploadScreenshotIndex = commands.findIndex(
  //   c => c.command === "UPLOAD_SCREENSHOT"
  // );

  // if (uploadScreenshotIndex >= 0) {
  //   const command = commands[uploadScreenshotIndex];
  //   commands.splice(uploadScreenshotIndex, 1);
  //   console.log("command.id", command.id);
  //   await fetcher.markCommandAsCompleted(command.id);

  //   screenshot.grab(true, () => {});
  // }

  if (commands.length) {
    const command = commands.shift();
    // await analyzeScreen();
    await handleCommand(command);
    // await fetcher.markCommandAsCompleted(command.id);
  }
  //  else if (state.getState().gameIsOpen) {
  //   await analyzeScreen();
  // }
};

const COMMANDS_MAPPING = {
  CLICK_COORDINATES: async ({ x, y }) =>
    mouseUtils.click({ x: TOP_LEFT_X + x, y: TOP_LEFT_Y + y }),
  CLICK_COORDINATES_MULTIPLE: async ({ x, y }) => {
    mouseUtils.setRandomMouseDelay(30, 60);

    const numberOfClicks = Math.floor(Math.random() * (20 - 10)) + 10;
    mouseUtils.click({ x: TOP_LEFT_X + x, y: TOP_LEFT_Y + y }, numberOfClicks);
  },
  SCROLL_DOWN: async ({ x, y }) => {
    const START = { x: TOP_LEFT_X + x, y: TOP_LEFT_Y + y };
    const END = { x: TOP_LEFT_X + x, y: TOP_LEFT_Y + y - 250 };

    mouseUtils.drag(START, END);
  },
  SCROLL_UP: async ({ x, y }) => {
    const START = { x: TOP_LEFT_X + x, y: TOP_LEFT_Y + y };
    const END = { x: TOP_LEFT_X + x, y: TOP_LEFT_Y + y + 250 };

    mouseUtils.drag(START, END);
  }

  // LEVEL_ALL_HEROES_1: async () => await heroes.levelHeroes(1),
  // LEVEL_ALL_HEROES_3: async () => await heroes.levelHeroes(3),
  // LEVEL_ALL_HEROES_15: async () => await heroes.levelHeroes(15),
  // LEVEL_SWORD_MASTER: async () => await skills.levelSwordMaster(),
  // LEVEL_SKILLS_1: async () => await skills.levelAllSkills(1),
  // LEVEL_HEAVENLY_STRIKE: async () => await skills.levelHeavenlyStrike(),
  // LEVEL_DEADLY_STRIKES: async () => await skills.levelDeadlyStrikes(),
  // LEVEL_DEADLY_STRIKES_MAX: async () => await skills.levelDeadlyStrikes(20),
  // LEVEL_HAND_OF_MIDAS: async () => await skills.levelHandOfMidas(),
  // LEVEL_HAND_OF_MIDAS_MAX: async () => await skills.levelHandOfMidas(20),
  // LEVEL_FIRE_SWORD: async () => await skills.levelFireSword(),
  // LEVEL_FIRE_SWORD_MAX: async () => await skills.levelFireSword(20),
  // LEVEL_WAR_CRY: async () => await skills.levelWarCry(),
  // LEVEL_WAR_CRY_MAX: async () => await skills.levelWarCry(20),
  // LEVEL_SHADOW_CLONE: async () => await skills.levelShadowClone(),
  // LEVEL_SHADOW_CLONE_MAX: async () => await skills.levelShadowClone(20),
  // SLEEP_30: async () => {
  //   for (let i = 0; i < 30; i++) {
  //     await asyncSleep(1900 + Math.random() * 200);
  //     await analyzeScreen();
  //   }
  // },
  // TAP_LITTLE: async () => await playarea.tap(20),
  // TAP_MANY: async () => await playarea.tap(300),
  // PRESTIGE: async () => {
  //   await prestige();
  //   state.setCount(0);
  // },
  // ACTIVATE_HEAVENLY_STRIKE: async () => await skills.activateHeavenlyStrike(),
  // ACTIVATE_DEADLY_STRIKES: async () => await skills.activateDeadlyStrikes(),
  // ACTIVATE_HAND_OF_MIDAS: async () => await skills.activateHandOfMidas(),
  // ACTIVATE_FIRE_SWORD: async () => await skills.activateFireSword(),
  // ACTIVATE_WAR_CRY: async () => await skills.activateWarCry(),
  // ACTIVATE_SHADOW_CLONE: async () => await skills.activateShadowClone(),
  // ACTIVATE_ALL_SKILLS_EXCEPT_HEAVENLY_STRIKE: async () => {
  //   robot.setMouseDelay(100 + Math.random() * 50);
  //   await skills.activateSkills([
  //     "SHADOW_CLONE",
  //     "WAR_CRY",
  //     "HAND_OF_MIDAS",
  //     "FIRE_SWORD",
  //     "DEADLY_STRIKES"
  //   ]);
  // },
  // CLOSE_APP: async () => {
  //   await emulator.closeTapTitans();
  //   state.setGameIsOpen(false);
  // },
  // OPEN_APP: async () => {
  //   await emulator.openTapTitans();
  //   await playarea.collectInactiveGold();
  //   state.setGameIsOpen(true);
  // },
  // COLLECT_INACTIVE_GOLD: async () => await playarea.collectInactiveGold(),
  // SWIPE_ALL_MENUS_TO_TOP: async () => {
  //   await skills.swipeToTop();
  //   await heroes.swipeToTop();
  // },
  // CLAN_QUEST: async () => await clanQuest(),
  // STATS: async () => {
  //   const { mana, stage } = await screenshot.takeScreenshot(["STAGE", "MANA"]);
  //   fetcher.saveLog("mana: " + mana);
  //   fetcher.saveLog("stage: " + stage);
  // }
};

async function handleCommand(command) {
  const { message } = command;
  if (COMMANDS_MAPPING[message]) {
    await COMMANDS_MAPPING[message](command);
  }
}

async function prestige() {
  const PRESTIGE_ONE = { x: TOP_LEFT_X + 450, y: TOP_LEFT_Y + 870 };
  const PRESTIGE_TWO = { x: TOP_LEFT_X + 270, y: TOP_LEFT_Y + 730 };
  const PRESTIGE_THREE = { x: TOP_LEFT_X + 370, y: TOP_LEFT_Y + 620 };

  mouseUtils.click(FIRST_MENU_BUTTON);
  await mouseUtils.dragMenuToTheBottom(6);
  await asyncSleep(1000 + Math.random() * 500);
  mouseUtils.click(PRESTIGE_ONE);
  await asyncSleep(1000 + Math.random() * 500);
  mouseUtils.click(PRESTIGE_TWO);
  await asyncSleep(1000 + Math.random() * 500);
  mouseUtils.click(PRESTIGE_THREE);
  await asyncSleep(12000 + Math.random() * 1000);

  mouseUtils.click(FIRST_MENU_BUTTON);
  await mouseUtils.dragMenuToTheTop(5);
  await asyncSleep(2000);
  mouseUtils.click(FIRST_MENU_BUTTON);
}

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

  await playarea.tap(250, 40);

  await asyncSleep(2000 + Math.random() * 500);
  mouseUtils.click(CLOSE_CLAN_QUEST, 1, 5);
  await asyncSleep(2000 + Math.random() * 500);
  mouseUtils.click(CLOSE_CLAN_QUEST, 1, 5);
  await asyncSleep(1000 + Math.random() * 500);
}
