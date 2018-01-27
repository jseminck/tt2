const isPixelWhite = (pixel, image, whiteRgb = 245) => {
  const pixelIndex = image.getPixelIndex(pixel.x, pixel.y);

  const red = image.bitmap.data[pixelIndex];
  const green = image.bitmap.data[pixelIndex + 1];
  const blue = image.bitmap.data[pixelIndex + 2];

  return red >= whiteRgb && green >= whiteRgb && blue >= whiteRgb;
};
