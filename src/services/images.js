const loadImage = data => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = err => reject(err);
    image.src = data;
  });
};

export default loadImage;
