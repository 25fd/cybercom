const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController')

router
  .route('/')
  .post(uploadController.postFile)

module.exports = router;
