const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { autenticar, autorizar } = require('../middlewares/auth');

router.get('/', categoryController.getAllCategories);
router.post('/', autenticar, autorizar('ADMIN'), categoryController.createCategory);
router.put('/:id', autenticar, autorizar('ADMIN'), categoryController.updateCategory);
router.delete('/:id', autenticar, autorizar('ADMIN'), categoryController.deleteCategory);

module.exports = router;
