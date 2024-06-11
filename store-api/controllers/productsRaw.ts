import { Request, Response } from 'express';
import pg from 'pg';

async function getAllProductsRaw(req: Request, res: Response) {
  const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWD,
  });

  const { featured, company, name, sort, numericFilters } = req.query;
  const whereClauses = [];
  const replacements: any[] = [];

  // 構建 WHERE 子句和相應的參數
  if (featured) {
    whereClauses.push(`product_featured = $${replacements.length + 1}`);
    replacements.push(featured === 'true');
  }
  if (company) {
    whereClauses.push(`product_company = $${replacements.length + 1}`);
    replacements.push(company);
  }
  if (name) {
    whereClauses.push(`product_name ILIKE $${replacements.length + 1}`);
    replacements.push(`%${name}%`);
  }
  if (numericFilters) {
    const filters = numericFilters.split(',');
    filters.forEach((filter) => {
      const [fieldName, operator, value] = filter.split(/\b(<|>|>=|=|<|<=)\b/);
      whereClauses.push(`${fieldName} ${operator} $${replacements.length + 1}`);
      replacements.push(Number(value));
    });
  }

  // 構建 ORDER BY 子句
  const sortOrderMap: { [key: string]: string } = {
    price: 'product_price',
    name: 'product_name',
  };

  let orderByClause = 'ORDER BY ';
  if (sort) {
    const sortFields = (sort as string).split(',');
    orderByClause += sortFields
      .map((sortField) => {
        const isDescending = sortField.startsWith('-');
        const fieldName = isDescending ? sortField.slice(1) : sortField;
        const sortDirection = isDescending ? 'DESC' : 'ASC';
        const resolvedSortField = sortOrderMap[fieldName];
        return `"${resolvedSortField}" ${sortDirection}`;
      })
      .join(', ');
  } else {
    orderByClause += '"createdAt"';
  }

  // 構建 SQL 查詢
  const whereClause =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
  const query = `
    SELECT *
    FROM products
    ${whereClause}
    ${orderByClause}
  `;

  try {
    // 執行 SQL 查詢
    const result = await pool.query(query, replacements);
    const products = result.rows; // 取得結果行

    res.status(200).json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // 釋放資源
    await pool.end();
  }
}

export { getAllProductsRaw };
