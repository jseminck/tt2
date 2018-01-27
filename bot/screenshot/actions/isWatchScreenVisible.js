module.exports = async function isWatchScreenVisible(image) {
  const hash = image.crop(50, 710, 150, 50).hash();

  if (hash === "9ww800A8300") {
    return { key: "isWatchScreenVisible", value: true };
  }
  return { key: "isWatchScreenVisible", value: false };
};
