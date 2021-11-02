const express = require('express');
const router = express.Router();
// middleware for handling file uploads
const multer = require('multer');
const AWS = require("aws-sdk");
const paramsConfig = require('../utils/params-config');

// create temporary storage container to hold image files
// until ready to upload to S3 bucket
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
});

// storage destination for key
// upload stores image data from POST route
// single method = only upload one image
// image is the key
const upload = multer({storage}).single('image');

// instantiate service object to communicate with s3 web service
// allows upload to s3 bucket
const s3 = new AWS.S3({
  // precautionary measure in case of changes
  apiVersion: '2006-03-01'
});

// localhost:3000/api/image-upload
router.post('/image-upload', upload, (req, res) => {
  const params = paramsConfig(req.file);
  // upload image to s3
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});

module.exports = router;