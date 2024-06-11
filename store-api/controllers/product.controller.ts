import { Request, Response } from 'express';
import productService from '../services/product.service';

class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    const data = { ...req.query };
    const products = await productService.getAll(data);
    res.status(200).json({ products, count: products.length });
  }
}

export default ProductController;
