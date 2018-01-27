const { TOP_LEFT_X, TOP_LEFT_Y } = require("../constants");
const PythonShell = require("python-shell");
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const api = require("../api");

const getActiveSkills = require("./actions/getActiveSkills");
const getMana = require("./actions/getMana");
const getSkillPosition = require("./actions/getSkillPosition");
const getStage = require("./actions/getStage");
const isFairyVisible = require("./actions/isFairyVisible");
const isFightBossVisible = require("./actions/isFightBossVisible");
const isMenuOpen = require("./actions/isMenuOpen");
const isWatchScreenVisible = require("./actions/isWatchScreenVisible");

const { promisify } = require("util");
const pythonRun = promisify(PythonShell.run);
const readDir = promisify(fs.readdir);
const jimpRead = promisify(Jimp.read);

const SCREENSHOT_DIRECTORY = __dirname + "/files/";

module.exports = {
  deleteAll() {
    deleteAllFiles();
  },

  async takeScreenshot(actions) {
    await pythonRun(__dirname + "/screenGrab.pyw");
    const file = await getLatestScreenshot();
    const image = await jimpRead(SCREENSHOT_DIRECTORY + file);

    const output = {};

    const data = fs.readFileSync(SCREENSHOT_DIRECTORY + file);
    const dataBase64 = data.toString("base64");
    await api.uploadImage(dataBase64);
    api.emit("SCREENSHOT_UPLOADED");

    await Promise.all(
      actions.map(async action => {
        const { key, value } = await doAction(image.clone(), action);
        output[key] = value;
      })
    );

    // Delete all files
    fs.readdirSync(SCREENSHOT_DIRECTORY).forEach(file => {
      fs.unlink(SCREENSHOT_DIRECTORY + file, err => {
        if (err) throw err;
      });
    });

    return output;
  }
};

async function getLatestScreenshot() {
  try {
    const files = await readDir(SCREENSHOT_DIRECTORY);

    let latest;
    files.forEach(file => {
      if (!latest) {
        latest = file;
      }

      const fileWithoutExtension = file.substring(0, file.length - 4);
      const fileTimestamp = fileWithoutExtension.split("__")[1];

      const latestWithoutExtension = latest.substring(0, latest.length - 4);
      const latestTimestamp = latestWithoutExtension.split("__")[1];

      if (Number(fileTimestamp) > Number(latestTimestamp)) {
        latest = file;
      }
    });

    return latest;
  } catch (err) {
    console.warn(err);
  }
}

async function doAction(image, action) {
  if (action === "STAGE") {
    return getStage(image);
  }

  if (action === "MANA") {
    return getMana(image);
  }

  if (action === "IS_MENU_OPEN") {
    return isMenuOpen(image);
  }

  if (action === "IS_FAIRY_VISIBLE") {
    return isFairyVisible(image);
  }

  if (action === "IS_FIGHT_BOSS_VISIBLE") {
    return isFightBossVisible(image);
  }

  if (action === "IS_WATCH_SCREEN_VISIBLE") {
    return isWatchScreenVisible(image);
  }

  if (action === "GET_ACTIVE_SKILLS") {
    return getActiveSkills(image);
  }

  if (action === "HAND_OF_MIDAS_LEVEL_SKILL_Y") {
    return getLevelSkillPosition(image, "HAND_OF_MIDAS");
  }

  if (action === "SHADOW_CLONE_LEVEL_SKILL_Y") {
    return getLevelSkillPosition(image, "SHADOW_CLONE");
  }

  if (action === "WAR_CRY_LEVEL_SKILL_Y") {
    return getLevelSkillPosition(image, "WAR_CRY");
  }
}

// UTILITIES
