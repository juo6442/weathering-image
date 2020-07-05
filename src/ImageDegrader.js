function getImageFromData(data) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = data;
  });
}

async function fitImageSize(imageData, size) {
  if (!imageData) return "";

  const image = await getImageFromData(imageData);
  const canvas = document.createElement("canvas");

  const imageSize = image.width * image.height;
  const scale = (size < imageSize) ? Math.sqrt(size / imageSize) : 1;
  canvas.width = parseInt(image.width * scale);
  canvas.height = parseInt(image.height * scale);

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", 1);
}

function processFirstPass(image, quality, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", quality);
}

function processSecondPass(image, overlayAmount, colorBurnAmount, quality, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "overlay";
  ctx.fillStyle = "black";
  ctx.globalAlpha = overlayAmount;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "color-burn";
  ctx.fillStyle = "rgb(230, 225, 170)";
  ctx.globalAlpha = colorBurnAmount;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", quality);
}

async function getDegradedImage(imageData, degrade) {
  if (!imageData) return "";

  const image = await getImageFromData(imageData);
  const resultWidth = image.width;
  const resultHeight = image.height;

  const firstPassScale = (1 - degrade / 100) * 0.5 + 0.5;
  let result = processFirstPass(
    image,
    (100 - degrade) / 100,
    resultWidth * firstPassScale, resultHeight * firstPassScale);

  result = processSecondPass(
    await getImageFromData(result),
    degrade / 100 * 0.1,
    degrade / 100,
    (100 - degrade) / 100,
    resultWidth, resultHeight);

  return result;
}

export { fitImageSize, getDegradedImage };
