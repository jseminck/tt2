const Jimp = require("jimp");
const { TOP_LEFT_X, TOP_LEFT_Y, FIRST_MENU_BUTTON } = require("../constants");
const asyncSleep = require("../util/asyncSleep");
const mouseUtils = require("../util/mouseUtils");
const screenshot = require("../screenshot");
const robot = require("robotjs");

const MIDDLE_OF_SCREEN = { x: TOP_LEFT_X + 270, y: TOP_LEFT_Y + 400 };
const MIDDLE_OF_SCREEN_LEFT = { x: TOP_LEFT_X + 100, y: TOP_LEFT_Y + 400 };
const MIDDLE_OF_SCREEN_RIGHT = { x: TOP_LEFT_X + 315, y: TOP_LEFT_Y + 400 };

const INACTIVE_GOLD = {
  x: TOP_LEFT_X + 30,
  y: TOP_LEFT_Y + 260
};

module.exports = {
  async tap(times, delay = 30) {
    robot.setMouseDelay(delay);
    for (let i = 0; i < times; i++) {
      mouseUtils.click(MIDDLE_OF_SCREEN_LEFT, 1, 100);
      mouseUtils.click(MIDDLE_OF_SCREEN_RIGHT, 1, 100);
    }
  },

  async collectInactiveGold() {
    mouseUtils.click(INACTIVE_GOLD);
  }
};
