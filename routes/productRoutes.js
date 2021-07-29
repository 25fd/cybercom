const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')


router
  .route('/mysql')
  .get(authController.protect, productController.getProduct)
  .post(authController.protect, productController.createProduct)


  module.exports = router;