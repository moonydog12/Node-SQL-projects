import express from 'express';
import ProductController from '../../controllers/product.controller';
// import { getAllProductsRaw } from '../../controllers/productsRaw';

const { getAllProducts } = ProductController;

const router = express.Router();
router.get('/', getAllProducts);

export default router;
