import { Request, Response } from 'express';
import sequelize from '../src/db';

async function getAllProductsRaw(req: Request, res: Response) {
  const { featured, company, name, sort } = req.query;
  let whereClause = '';
  const replacements: { [key: string]: any } = {};

  // 構建 WHERE 子句
  if (featured) {
    // 如果有 featured 參數，則添加到 WHERE 子句中
    whereClause += 'product_featured = :featured ';
    replacements.featured = featured === 'true';
  }
  if (company) {
    // 如果有 company 參數，則添加到 WHERE 子句中
    whereClause += 'AND product_company = :company ';
    replacements.company = company;
  }
  if (name) {
    // 如果有 name 參數，則添加到 WHERE 子句中（ILIKE 用於模糊搜索）
    whereClause += 'AND product_name ILIKE :name ';
    replacements.name = `%${name}%`;
  }

  // 定義排序欄位和它們對應的資料庫欄位的字典
  const sortOrderMap: { [key: string]: string } = {
    price: 'product_price',
    name: 'product_name',
  };

  // 解析多個排序條件
  let sortFields;
  if (sort) {
    sortFields = (sort as string).split(',');
  }

  // 構建 ORDER BY 子句
  let orderByClause = 'ORDER BY ';
  if (sortFields && sortFields.length > 0) {
    sortFields.forEach((sortField: string, index: number) => {
      const isDescending = sortField.startsWith('-');
      const fieldName = isDescending ? sortField.slice(1) : sortField;
      const sortDirection = isDescending ? 'DESC' : 'ASC';
      const resolvedSortField = sortOrderMap[fieldName];

      orderByClause += `${
        index > 0 ? ', ' : ''
      }${resolvedSortField} ${sortDirection}`;
    });
  } else {
    orderByClause += '"createdAt"';
  }

  const query = `
    SELECT *
    FROM products
    ${whereClause ? `WHERE ${whereClause}` : ''}
    ${orderByClause}
  `;

  const products = await sequelize.query(query, { replacements });
  res.status(200).json({ products, count: products.length });
}

export { getAllProductsRaw };
