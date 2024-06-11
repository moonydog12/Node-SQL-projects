import { Op, WhereOptions } from 'sequelize';
import Product from '../src/db/schemas/product.schema';

interface ProductData {
  id?: string;
  price?: string;
  name?: string;
  featured?: string;
  rating?: string;
  company?: string;
  sort?: string;
  field?: string;
  page?: string;
  limit?: string;
  numericFilters?: string;
}

interface Dictionary {
  [key: string]: string;
}

class ProductService {
  #fieldDictionary: Dictionary = {
    id: 'product_id',
    price: 'product_price',
    name: 'product_name',
    featured: 'product_featured',
    rating: 'product_rating',
    company: 'product_company',
  };

  #operatorMap = {
    '>': Op.gt,
    '>=': Op.gte,
    '=': Op.eq,
    '<': Op.lt,
    '<=': Op.lte,
  };

  // 解析數字篩選器
  private parseNumericFilters(
    numericFilters: string | undefined,
  ): WhereOptions {
    const queryObj: WhereOptions = {};

    if (!numericFilters) return {};

    const filters = numericFilters.split(',');
    filters.forEach((filter) => {
      const [fieldName, operator, value] = filter.split(/\b(<|>|>=|=|<|<=)\b/);

      // 確保篩選器中使用的欄位名稱和操作符是有效的
      if (
        !Object.prototype.hasOwnProperty.call(this.#fieldDictionary, fieldName)
      ) {
        throw new Error(`Invalid filedName: ${fieldName}`);
      }

      const fieldKey = this.#fieldDictionary[fieldName];
      const opSymbol = this.#operatorMap[operator];
      if (!opSymbol) {
        throw new Error(`Invalid operator: ${operator}`);
      }

      // 將篩選條件添加到查詢對象中
      queryObj[fieldKey] = {
        [opSymbol]: Number(value),
      };
    });

    return queryObj;
  }

  // 構建排序列表
  private buildOrderList(sort: string | undefined): [string, string][] {
    const orderList: [string, string][] = [];

    if (sort) {
      const sortFields = sort.split(',');

      sortFields.forEach((field) => {
        const trimmedField = field.trim();
        const isDescending = trimmedField.startsWith('-');
        const fieldName = isDescending ? trimmedField.slice(1) : trimmedField;

        // 確保排序欄位有效並對應到字典中的排序方式
        if (
          Object.prototype.hasOwnProperty.call(this.#fieldDictionary, fieldName)
        ) {
          // 將排序欄位名稱和排序方向添加到排序列表中
          const sortOrder: [string, string] = [
            this.#fieldDictionary[fieldName],
            isDescending ? 'DESC' : 'ASC',
          ];
          orderList.push(sortOrder);
        }
      });
    }

    if (orderList.length === 0) {
      // 如果排序列表為空，則預設按照 createdAt 排序
      orderList.push(['createdAt', 'DESC']);
    }

    return orderList;
  }

  // 查詢並返回符合條件的產品列表
  async getAll(data: ProductData) {
    const {
      numericFilters,
      sort,
      page = '1',
      limit = '10',
      ...otherData
    } = data;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offsetNumber = (pageNumber - 1) * limitNumber;

    const queryObj: WhereOptions = {
      ...this.parseNumericFilters(numericFilters),
      ...Object.keys(otherData).reduce((acc: WhereOptions, key: string) => {
        const fieldKey = this.#fieldDictionary[key];
        if (fieldKey) {
          acc[fieldKey] = otherData[key];
        }
        return acc;
      }, {}),
    };

    const orderList = this.buildOrderList(sort);

    const products = await Product.findAll({
      where: queryObj,
      order: orderList,
      limit: limitNumber,
      offset: offsetNumber,
    });

    return products;
  }
}

const productService = new ProductService();

export default productService;
