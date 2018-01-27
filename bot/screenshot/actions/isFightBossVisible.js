module.exports = async function isFightBossVisible(image) {
  const hash = image.crop(405, 25, 100, 30).hash();

  if (hash === "a24ug1h250w") {
    return { key: "isFightBossVisible", value: true };
  }
  return { key: "isFightBossVisible", value: false };
};
