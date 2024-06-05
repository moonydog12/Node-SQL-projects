import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../src/db/schemas/product.schema';

interface QueryObject {
  product_featured?: boolean;
  product_company?: string;
  product_name?: any;
}

async function getAllProducts(req: Request, res: Response) {
  const { featured, company, name } = req.query;
  const queryObj: QueryObject = {};

  if (featured) {
    queryObj.product_featured = featured === 'true';
  }
  if (company) {
    queryObj.product_company = company as string;
  }
  if (name) {
    // 模糊搜尋? 可能要參考文件
    queryObj.product_name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  console.log(queryObj);

  const products = await Product.findAll({
    where: queryObj,
  });
  res.status(200).json({ products, count: products.length });
}

export { getAllProducts };
