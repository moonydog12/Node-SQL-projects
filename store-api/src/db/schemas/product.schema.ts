import { DataTypes } from 'sequelize';
import sequelize from '..';

const companies = ['ikea', 'liddy', 'caressa', 'marcos'];

const Product = sequelize.define(
  'products',
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    product_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'product name must be provided',
        },
      },
    },

    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'product price must be provided',
        },
      },
    },

    product_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'false',
    },

    product_rating: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 4.5,
    },

    product_company: {
      type: DataTypes.ENUM,
      values: companies,
      validate: {
        notIn: {
          args: [companies],
          msg: 'Your company is not included in the list',
        },
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    updatedAt: false,
    createdAt: false,
  },
);

export const start = async () => {
  await sequelize.sync({ force: true });
  console.log('test');
};

export default Product;
