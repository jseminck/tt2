module.exports = async function isFairyVisible(image) {
  const fairyRoad = image.crop(0, 150, 532, 200);
  const { bitmap: { width, height, data } } = fairyRoad;

  let fairy;
  fairyRoad.scan(0, 0, width, height, (x, y, idx) => {
    const red = data[idx + 0];
    const green = data[idx + 1];
    const blue = data[idx + 2];

    if (red === 238 && green === 161 && blue === 33) {
      fairy = { x: TOP_LEFT_X + x, y: TOP_LEFT_Y + 150 + y };
      return;
    }
  });

  return { key: "containsFairy", value: fairy };
};
