import { Op, WhereOptions } from 'sequelize';
import Product from '../src/db/schemas/product.schema';

// 定義請求參數的介面
interface ProductData {
  featured: string;
  company: string;
  name: string;
  sort: string;
}

class ProductService {
  // 構建排序列表
  private static buildOrderList(sort: string | undefined): [string, string][] {
    // 定義排序順序的字典
    const sortOrderMap: { [key: string]: string } = {
      price: 'ASC',
      name: 'ASC',
    };

    const orderList: [string, string][] = [];

    // 解析排序參數並構建排序列表
    if (sort) {
      const sortFields = sort.split(',');

      sortFields.forEach((field) => {
        const trimmedField = field.trim();
        const isDescending = trimmedField.startsWith('-');
        const fieldName = isDescending ? trimmedField.slice(1) : trimmedField;

        // 確保排序欄位有效並對應到字典中的排序方式
        if (Object.prototype.hasOwnProperty.call(sortOrderMap, fieldName)) {
          orderList.push([
            `product_${fieldName}`,
            isDescending ? 'DESC' : 'ASC',
          ]);
        }
      });
    }

    // 如果排序列表為空，則添加默認排序條件
    if (orderList.length === 0) {
      orderList.push(['createdAt', 'DESC']);
    }

    return orderList;
  }

  // 獲取所有產品
  static async getAll(data: ProductData) {
    const { featured, company, name, sort } = data;
    const queryObj: WhereOptions = {};

    if (featured) {
      queryObj.product_featured = featured === 'true';
    }
    if (company) {
      queryObj.product_company = company as string;
    }
    if (name) {
      // 使用 Sequelize 的 Op.iLike 進行模糊搜索
      queryObj.product_name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    // 查詢並返回符合條件的產品列表
    const products = await Product.findAll({
      where: queryObj,
      order: ProductService.buildOrderList(sort as string),
    });

    return products;
  }
}

export default ProductService;
