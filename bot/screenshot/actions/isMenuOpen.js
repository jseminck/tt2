module.exports = async function isMenuOpen(image) {
  const pixelIndex = image.getPixelIndex(355, 550);
  const { bitmap: { data } } = image;

  const red = data[pixelIndex];
  const green = data[pixelIndex];
  const blue = data[pixelIndex];

  if (red === 83 && green === 83 && blue === 83) {
    return { key: "isMenuOpen", value: true };
  }

  return { key: "isMenuOpen", value: false };
};
