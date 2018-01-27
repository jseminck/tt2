const manaOneData = require("./sources/mana/mana_one.json");
const manaTwoData = require("./sources/mana/mana_two.json");

const isPixelWhite = require("./utils/isPixelWhite");

module.exports = async function getMana(image) {
  let mana = "abx";

  const manaOne = [23, 774, 8, 14];
  const manaTwo = [32, 774, 8, 11];

  // Clone the first time, then we can use the original image on the second time!
  const manaOneImage = image.clone().crop(...manaOne);

  ["1", "2", "3", "4"].forEach(key => {
    const whitePixels = manaOneData[key];
    if (whitePixels.every(pixel => isPixelManaColor(pixel, manaOneImage))) {
      mana = mana.replace("a", key);
    }
  });

  const manaTwoImage = image.crop(...manaTwo);

  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].forEach(key => {
    const whitePixels = manaTwoData[key];
    if (whitePixels.every(pixel => isPixelManaColor(pixel, manaTwoImage))) {
      mana = mana.replace("b", key);
    }
  });

  return { key: "mana", value: mana };
};

const isPixelManaColor = (pixel, image) => {
  const pixelIndex = image.getPixelIndex(pixel.x, pixel.y);

  const red = image.bitmap.data[pixelIndex];
  const green = image.bitmap.data[pixelIndex + 1];
  const blue = image.bitmap.data[pixelIndex + 2];

  return red === 52 && green === 245 && blue === 255;
};
