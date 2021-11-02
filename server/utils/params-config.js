const { v4: uuidv4 } = require('uuid');

const params = fileName => {
  const myFile = fileName.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: 'user-images-bc125b06-f780-4452-bcff-42151fc79e34',
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    // grant read access to the image
    ACL: 'public-read'
  };

  return imageParams;
};

module.exports = params;