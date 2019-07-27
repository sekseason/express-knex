require('dotenv').config();

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.GCLOUD_STORAGE_BUCKET,
  keyFilename: __dirname + '/key.json'
});

module.exports = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
