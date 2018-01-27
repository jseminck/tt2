const stageOneData = require("./sources/stages/1000/stage_one.json");
const stageTwoData = require("./sources/stages/1000/stage_two.json");

const isPixelWhite = require("./utils/isPixelWhite");

module.exports = async function getStage(image) {
  let stage = "abxx";

  const stageOne = [244, 44, 12, 15];
  const stageTwo = [256, 44, 12, 15];

  // Clone the first time, then we can use the original image on the second time!
  const stageOneImage = image.clone().crop(...stageOne);

  ["3", "4", "5", "6", "7"].forEach(key => {
    const whitePixels = stageOneData[key];
    if (whitePixels.every(pixel => isPixelWhite(pixel, stageOneImage))) {
      stage = stage.replace("a", key);
    }
  });

  const stageTwoImage = image.crop(...stageTwo);

  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach(key => {
    const whitePixels = stageTwoData[key];
    if (whitePixels.every(pixel => isPixelWhite(pixel, stageTwoImage))) {
      stage = stage.replace("b", key);
    }
  });
  return { key: "stage", value: stage };
};
