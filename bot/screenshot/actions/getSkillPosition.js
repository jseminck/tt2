module.exports = function getLevelSkillPosition(image, skill) {
  const menuImage = image.crop(0, 578, 75, 350).write("menu.jpg");
  const { bitmap: { width, height, data } } = menuImage;

  let position = { x: undefined, y: undefined };
  let expectedRed, expectedGreen, expectedBlue;
  if (skill === "HAND_OF_MIDAS") {
    expectedRed = 207;
    expectedGreen = 142;
    expectedBlue = 16;
  } else if (skill === "SHADOW_CLONE") {
    expectedRed = 58;
    expectedGreen = 38;
    expectedBlue = 29;
  } else if (skill === "WAR_CRY") {
    expectedRed = 94;
    expectedGreen = 7;
    expectedBlue = 0;
  }

  menuImage.scan(0, 0, width, height, (x, y, idx) => {
    const red = data[idx + 0];
    const green = data[idx + 1];
    const blue = data[idx + 2];

    if (
      red === expectedRed &&
      green === expectedGreen &&
      blue === expectedBlue
    ) {
      position = { x: TOP_LEFT_X + x, y: TOP_LEFT_Y + 578 + y };
      return;
    }
  });

  return {
    key: "skillPosition_" + skill,
    value: position
  };
};
