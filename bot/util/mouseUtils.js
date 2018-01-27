const robot = require("robotjs");
const { TOP_LEFT_X, TOP_LEFT_Y } = require("../constants");
const asyncSleep = require("./asyncSleep");

const WIDTH = 532;
const HEIGHT = 946;

const BOTTOM_OF_MENU = { x: TOP_LEFT_X + 230, y: TOP_LEFT_Y + 879 };
const TOP_OF_MENU = { x: TOP_LEFT_X + 230, y: TOP_LEFT_Y + 675 };

async function drag(dragTimes, start, end, sleepTimeAfterDrag) {
  for (let i = 0; i < dragTimes; i++) {
    robot.moveMouse(start.x, start.y);
    robot.mouseToggle("down");
    robot.moveMouseSmooth(end.x, end.y);
    robot.mouseToggle("up");
    if (i === dragTimes) {
      await asyncSleep(sleepTimeAfterDrag);
    } else {
      await asyncSleep(sleepTimeAfterDrag / 2);
    }
  }
}

module.exports = {
  setRandomMouseDelay(start = 150, end = 250) {
    const randomMouseDelay = Math.floor(Math.random() * (end - start)) + start;
    robot.setMouseDelay(randomMouseDelay);
  },

  click(location, times = 1, xOffset = 20, yOffset) {
    for (let i = 0; i < times; i++) {
      const randomMouseDelay = Math.floor(Math.random() * (200 - 100)) + 100;
      robot.setMouseDelay(randomMouseDelay);

      const randomX =
        location.x + Math.floor(Math.random() * xOffset) - xOffset / 2;
      const randomY =
        location.y +
        Math.floor(Math.random() * (yOffset || xOffset)) -
        (yOffset || xOffset) / 2;

      robot.moveMouse(randomX, randomY);
      robot.mouseClick();
    }
  },

  async drag(start, end) {
    robot.setMouseDelay(200);
    await drag(1, start, end, 100);
  },

  async dragMenuToTheTop(
    dragTimes = 1,
    sleepTimeAfterDrag = 1000,
    start = TOP_OF_MENU,
    end = BOTTOM_OF_MENU
  ) {
    for (let i = 0; i < dragTimes; i++) {
      robot.moveMouse(start.x, start.y);
      robot.setMouseDelay(10);
      robot.mouseToggle("down");
      robot.moveMouseSmooth(end.x, end.y);
      robot.mouseToggle("up");
      robot.setMouseDelay(100);
      if (i === dragTimes) {
        await asyncSleep(sleepTimeAfterDrag);
      } else {
        await asyncSleep(sleepTimeAfterDrag / 3);
      }
    }
  },

  async dragMenuToTheBottom(
    dragTimes = 1,
    sleepTimeAfterDrag = 1000,
    start = BOTTOM_OF_MENU,
    end = TOP_OF_MENU
  ) {
    await drag(dragTimes, start, end, sleepTimeAfterDrag);
  }
};
