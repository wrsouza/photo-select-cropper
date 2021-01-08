const loadFile = item => {
  return new Promise((resolve, reject) => {
    const { file, progress } = item;
    const fileReader = new FileReader();
    fileReader.onload = e => {
      resolve(e.target.result);
    };
    fileReader.onprogress = e => {
      progress.load = Math.floor((e.loaded / e.total) * 100);
    };
    fileReader.onerror = e => {
      reject(e);
    };
    fileReader.readAsDataURL(file);
  });
};

export default loadFile;
