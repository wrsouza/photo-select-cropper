import loadFile from './files';
import loadImage from './images';

const calcScale = (width, height) => {
  const sizePreview = 280;
  return width > height ? sizePreview / width : sizePreview / height;
};

const calcImage = ({ item, width, height, image }) => {
  const { crop } = item;
  const iWidth = image.width > image.height ? image.width : image.height;
  const iHeight = image.width > image.height ? image.height : image.width;
  const wRatio = width / iWidth;
  const hRatio = height / iHeight;

  crop.scale = wRatio > hRatio ? wRatio : hRatio;
  crop.width = image.width;
  crop.height = image.height;
  crop.x = (width - image.width * crop.scale) / 2;
  crop.y = (height - image.height * crop.scale) / 2;
  crop.rotate = width !== height && image.width < image.height ? -90 : 0;
};

const renderImage = ({ item, width, height, image }) => {
  const scale = calcScale(width, height);
  const { crop } = item;

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((crop.rotate * Math.PI) / 180);
  ctx.filter = `grayscale(${crop.grayscale}%)`;
  ctx.drawImage(
    image,
    crop.x * scale - canvas.width / 2,
    crop.y * scale - canvas.height / 2,
    crop.width * crop.scale * scale,
    crop.height * crop.scale * scale
  );
  ctx.restore();
  crop.image = canvas.toDataURL();
};

const makePreview = async ({ width, height, item }) => {
  try {
    const data = await loadFile(item);
    const image = await loadImage(data);
    calcImage({ item, width, height, image });
    await renderImage({ item, width, height, image });
    return Promise.resolve();
  } catch (err) {
    const { crop } = item;
    crop.image = 'error';
    return Promise.reject(err);
  }
};

export default {
  calcScale,
  calcImage,
  makePreview,
  renderImage,
};
