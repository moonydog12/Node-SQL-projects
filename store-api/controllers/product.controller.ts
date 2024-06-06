import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    const { featured, company, name, sort } = req.query;
    const data = { featured, company, sort, name };
    const products = await ProductService.getAll(data);
    res.status(200).json({ products, count: products.length });
  }
}

export default ProductController;
