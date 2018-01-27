const isPixelWhite = require("./utils/isPixelWhite");

module.exports = async function getActiveSkills(image) {
  const pixelIndexes = {
    DEADLY_STRIKES: { x: 130, y: 814 },
    HAND_OF_MIDAS: { x: 219, y: 814 },
    FIRE_SWORD: { x: 307, y: 814 },
    WAR_CRY: { x: 396, y: 814 },
    SHADOW_CLONE: { x: 485, y: 814 }
  };

  const { bitmap: { data } } = image;
  const output = [];

  Object.keys(pixelIndexes).forEach(skill => {
    if (!isPixelWhite(pixelIndexes[skill], image, 230)) {
      output.push(skill);
    }
  });

  return {
    key: "getActiveSkills",
    value: output
  };
};
