const { TOP_LEFT_X, TOP_LEFT_Y, FIRST_MENU_BUTTON } = require("../constants");
const asyncSleep = require("../util/asyncSleep");
const mouseUtils = require("../util/mouseUtils");
const api = require("../api");
const robot = require("robotjs");
const screenshot = require("../screenshot");

const LEVEL_SWORD_MASTER = { x: TOP_LEFT_X + 460, y: TOP_LEFT_Y + 676 };

const HEAVENLY_STRIKE_LEVEL_SKILL = {
  x: TOP_LEFT_X + 440,
  y: TOP_LEFT_Y + 785
};

const DEADLY_STRIKES_LEVEL_SKILL = { x: TOP_LEFT_X + 440, y: TOP_LEFT_Y + 870 };

const FIRE_SWORD_LEVEL_SKILL = { x: TOP_LEFT_X + 440, y: TOP_LEFT_Y + 810 };

const HEAVENLY_STRIKE_ACTIVATE_SKILL = {
  x: TOP_LEFT_X + 45,
  y: TOP_LEFT_Y + 848
};
const DEADLY_STRIKES_ACTIVATE_SKILL = {
  x: TOP_LEFT_X + 140,
  y: TOP_LEFT_Y + 848
};
const HAND_OF_MIDAS_ACTIVATE_SKILL = {
  x: TOP_LEFT_X + 224,
  y: TOP_LEFT_Y + 848
};
const FIRE_SWORD_ACTIVATE_SKILL = { x: TOP_LEFT_X + 314, y: TOP_LEFT_Y + 848 };
const WAR_CRY_ACTIVATE_SKILL = { x: TOP_LEFT_X + 403, y: TOP_LEFT_Y + 848 };
const SHADOW_CLONE_ACTIVATE_SKILL = {
  x: TOP_LEFT_X + 493,
  y: TOP_LEFT_Y + 848
};

function toggleSkillsMenu() {
  robot.setMouseDelay(100);
  mouseUtils.click(FIRST_MENU_BUTTON);
}

async function dragSkillsMenuDown(numberOfDrags = 1) {
  robot.setMouseDelay(175);
  await mouseUtils.dragMenuToTheBottom(numberOfDrags, 1000);
  robot.setMouseDelay(100);
}

async function dragSkillsMenuUp(numberOfDrags = 1) {
  robot.setMouseDelay(175);
  await mouseUtils.dragMenuToTheTop(numberOfDrags, 1000);
  robot.setMouseDelay(100);
}

module.exports = {
  async swipeToTop() {
    await toggleSkillsMenu();
    await dragSkillsMenuUp(4);
    await toggleSkillsMenu();
  },

  async levelSwordMaster() {
    await api.saveLog("Levelling sword master");

    toggleSkillsMenu();
    mouseUtils.click(LEVEL_SWORD_MASTER);
    toggleSkillsMenu();
  },

  async levelAllSkills(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling all skills with" + numberOfClicks + "number of clicks"
    );

    toggleSkillsMenu();
    mouseUtils.click(HEAVENLY_STRIKE_LEVEL_SKILL, numberOfClicks, 50, 1);
    mouseUtils.click(DEADLY_STRIKES_LEVEL_SKILL, numberOfClicks, 50, 1);

    await dragSkillsMenuDown();
    const { HAND_OF_MIDAS_LEVEL_SKILL } = await getHandOfMidasSkillLocation();
    mouseUtils.click(HAND_OF_MIDAS_LEVEL_SKILL, numberOfClicks, 50, 1);
    mouseUtils.click(FIRE_SWORD_LEVEL_SKILL, numberOfClicks, 50, 1);

    await dragSkillsMenuDown();
    const {
      WAR_CRY_LEVEL_SKILL,
      SHADOW_CLONE_LEVEL_SKILL
    } = await getShadowCloneAndWarCrySkillLocation();
    mouseUtils.click(WAR_CRY_LEVEL_SKILL, numberOfClicks, 50, 1);
    mouseUtils.click(SHADOW_CLONE_LEVEL_SKILL, numberOfClicks, 50, 1);

    await dragSkillsMenuUp(3);
    toggleSkillsMenu();
  },

  async levelSkills(numberOfClicks = 3, skills) {
    await api.saveLog(
      "Levelling " + skills + "  with " + numberOfClicks + "number of clicks"
    );

    toggleSkillsMenu();

    await dragSkillsMenuUp(1);

    if (skills.includes("HEAVENLY_STRIKE")) {
      mouseUtils.click(HEAVENLY_STRIKE_LEVEL_SKILL, numberOfClicks, 50, 5);
    }

    if (skills.includes("DEADLY_STRIKES")) {
      mouseUtils.click(DEADLY_STRIKES_LEVEL_SKILL, numberOfClicks, 50, 5);
    }

    await dragSkillsMenuDown();
    const { HAND_OF_MIDAS_LEVEL_SKILL } = await getHandOfMidasSkillLocation();
    if (skills.includes("HAND_OF_MIDAS")) {
      mouseUtils.click(HAND_OF_MIDAS_LEVEL_SKILL, numberOfClicks, 50, 5);
    }
    if (skills.includes("FIRE_SWORD")) {
      mouseUtils.click(FIRE_SWORD_LEVEL_SKILL, numberOfClicks, 50, 5);
    }

    await dragSkillsMenuDown();
    const {
      WAR_CRY_LEVEL_SKILL,
      SHADOW_CLONE_LEVEL_SKILL
    } = await getShadowCloneAndWarCrySkillLocation();
    if (skills.includes("WAR_CRY")) {
      mouseUtils.click(WAR_CRY_LEVEL_SKILL, numberOfClicks, 50, 5);
    }
    if (skills.includes("SHADOW_CLONE")) {
      mouseUtils.click(SHADOW_CLONE_LEVEL_SKILL, numberOfClicks, 50, 5);
    }

    await dragSkillsMenuUp(2);
    toggleSkillsMenu();
  },

  async levelHeavenlyStrike(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling Heavenly Strike with " + numberOfClicks + " number of clicks"
    );

    toggleSkillsMenu();
    mouseUtils.click(HEAVENLY_STRIKE_LEVEL_SKILL, numberOfClicks, 10);
    toggleSkillsMenu();
  },

  async levelDeadlyStrikes(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling DeadlyStrikes with " + numberOfClicks + " number of clicks"
    );

    toggleSkillsMenu();
    mouseUtils.click(DEADLY_STRIKES_LEVEL_SKILL, numberOfClicks, 10);
    toggleSkillsMenu();
  },

  async levelHandOfMidas(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling Hand of Midas with " + numberOfClicks + " number of clicks"
    );

    toggleSkillsMenu();
    await dragSkillsMenuDown();
    const { HAND_OF_MIDAS_LEVEL_SKILL } = await getHandOfMidasSkillLocation();
    mouseUtils.click(HAND_OF_MIDAS_LEVEL_SKILL, numberOfClicks, 10);
    await dragSkillsMenuUp(2);
    toggleSkillsMenu();
  },

  async levelFireSword(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling Fire Sword with " + numberOfClicks + " number of clicks"
    );

    toggleSkillsMenu();
    await dragSkillsMenuDown();
    mouseUtils.click(FIRE_SWORD_LEVEL_SKILL, numberOfClicks, 10);
    await dragSkillsMenuUp(2);
    toggleSkillsMenu();
  },

  async levelWarCry(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling War Cry with " + numberOfClicks + " number of clicks"
    );

    toggleSkillsMenu();
    await dragSkillsMenuDown(2);
    const {
      WAR_CRY_LEVEL_SKILL,
      SHADOW_CLONE_LEVEL_SKILL
    } = await getShadowCloneAndWarCrySkillLocation();
    mouseUtils.click(WAR_CRY_LEVEL_SKILL, numberOfClicks, 10);
    await dragSkillsMenuUp(3);
    toggleSkillsMenu();
  },

  async levelShadowClone(numberOfClicks = 3) {
    await api.saveLog(
      "Levelling Shadow Clone with " + numberOfClicks + " number of clicks"
    );

    toggleSkillsMenu();
    await dragSkillsMenuDown(2);

    const {
      WAR_CRY_LEVEL_SKILL,
      SHADOW_CLONE_LEVEL_SKILL
    } = await getShadowCloneAndWarCrySkillLocation();

    mouseUtils.click(SHADOW_CLONE_LEVEL_SKILL, numberOfClicks, 10);
    await dragSkillsMenuUp(3);
    toggleSkillsMenu();
  },

  async activateSkills(skills) {
    mouseUtils.setRandomMouseDelay();

    if (skills.includes("SHADOW_CLONE")) {
      mouseUtils.click(SHADOW_CLONE_ACTIVATE_SKILL);
    }
    if (skills.includes("WAR_CRY")) {
      mouseUtils.click(WAR_CRY_ACTIVATE_SKILL);
    }
    if (skills.includes("FIRE_SWORD")) {
      mouseUtils.click(FIRE_SWORD_ACTIVATE_SKILL);
    }
    if (skills.includes("HAND_OF_MIDAS")) {
      mouseUtils.click(HAND_OF_MIDAS_ACTIVATE_SKILL);
    }
    if (skills.includes("DEADLY_STRIKES")) {
      mouseUtils.click(DEADLY_STRIKES_ACTIVATE_SKILL);
    }
    if (skills.includes("HEAVENLY_STRIKE")) {
      mouseUtils.click(HEAVENLY_STRIKE_ACTIVATE_SKILL);
    }
  }
};

async function getHandOfMidasSkillLocation() {
  const HAND_OF_MIDAS_LEVEL_SKILL = {
    x: TOP_LEFT_X + 440,
    y: TOP_LEFT_Y + 715
  };

  const { skillPosition_HAND_OF_MIDAS } = await screenshot.takeScreenshot([
    "HAND_OF_MIDAS_LEVEL_SKILL_Y"
  ]);

  console.log("skillPosition_HAND_OF_MIDAS", skillPosition_HAND_OF_MIDAS);

  HAND_OF_MIDAS_LEVEL_SKILL.y =
    skillPosition_HAND_OF_MIDAS.y || HAND_OF_MIDAS_LEVEL_SKILL.y;

  return {
    HAND_OF_MIDAS_LEVEL_SKILL
  };
}

async function getShadowCloneAndWarCrySkillLocation() {
  const WAR_CRY_LEVEL_SKILL = { x: TOP_LEFT_X + 440, y: TOP_LEFT_Y + 660 };
  const SHADOW_CLONE_LEVEL_SKILL = { x: TOP_LEFT_X + 440, y: TOP_LEFT_Y + 740 };

  const {
    skillPosition_SHADOW_CLONE,
    skillPosition_WAR_CRY
  } = await screenshot.takeScreenshot([
    "SHADOW_CLONE_LEVEL_SKILL_Y",
    "WAR_CRY_LEVEL_SKILL_Y"
  ]);

  console.log("skillPosition_SHADOW_CLONE", skillPosition_SHADOW_CLONE);
  console.log("skillPosition_WAR_CRY", skillPosition_WAR_CRY);

  SHADOW_CLONE_LEVEL_SKILL.y =
    skillPosition_SHADOW_CLONE.y || SHADOW_CLONE_LEVEL_SKILL.y;
  WAR_CRY_LEVEL_SKILL.y = skillPosition_WAR_CRY.y || WAR_CRY_LEVEL_SKILL.y;

  return {
    SHADOW_CLONE_LEVEL_SKILL,
    WAR_CRY_LEVEL_SKILL
  };
}
