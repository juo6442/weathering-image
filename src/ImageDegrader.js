function getImageFromData(data) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = data;
  });
}

function processFirstPass(image, scale, quality) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
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
  console.log(degrade);

  const image = await getImageFromData(imageData);
  const originalWidth = image.width;
  const originalHeight = image.height;

  let result = processFirstPass(
    image,
    (1 - degrade / 100) * 0.5 + 0.5,
    (100 - degrade) / 100);
  result = processSecondPass(
    await getImageFromData(result),
    degrade / 100 * 0.5,
    degrade / 100,
    (100 - degrade) / 100,
    originalWidth, originalHeight);

  return result;
}

export { getDegradedImage };
