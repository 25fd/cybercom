const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const mySqlController = require('../controllers/mysqlController')




router
  .route('/mysql')
  .get(authController.protect, mySqlController.getNote)
  .post(authController.protect, mySqlController.createNote)
router
  .route('/mysql/:id')
  .post(authController.protect, mySqlController.updateNote)
  .delete(authController.protect, mySqlController.deleteCategory)

module.exports = router;