const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { autenticar, autorizar } = require('../middlewares/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', autenticar, autorizar('ADMIN'), productController.createProduct);
router.put('/:id', autenticar, autorizar('ADMIN'), productController.updateProduct);
router.delete('/:id', autenticar, autorizar('ADMIN'), productController.deleteProduct);

module.exports = router;
