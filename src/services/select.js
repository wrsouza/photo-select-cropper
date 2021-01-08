import sha1 from 'js-sha1';

const selectedFiles = e => {
  const { files } = e.target;
  const list = [];
  Array.from(files).forEach(file => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const { name, size } = file;
      const extension = name.split('.').pop();
      const timestamp = new Date().getTime();
      const filename = `${sha1(
        name + timestamp.toString()
      )}.${extension.toLowerCase()}`;

      list.push({
        file,
        size,
        name,
        filename,
        crop: {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          grayscale: 0,
          image: null,
        },
        progress: {
          load: 0,
          upload: 0,
        },
        quantity: 1,
        description: '',
        selected: false,
      });
    }
  });
  return list;
};

const totalFotos = (listFiles = []) => {
  let total = 0;
  listFiles.forEach(i => {
    total += i.quantity;
  });
  return total;
};

const selectMultFiles = ({ listFiles, limit }) => {
  return new Promise(resolve => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.jpg, .jpeg, .png|images/*';
    input.addEventListener('change', e => {
      const list = selectedFiles(e);
      let checkLimit = false;
      list.forEach(item => {
        if (
          !listFiles.filter(i => i.name === item.name && i.size === item.size)
            .length
        ) {
          if (limit === 0 || totalFotos(listFiles) < limit) {
            listFiles.push(item);
          } else {
            checkLimit = true;
          }
        }
      });
      input = null;
      resolve(checkLimit);
    });
    input.click();
  });
};

export default selectMultFiles;
