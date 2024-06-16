import query from '../db';
import { CustomAPIError } from '../errors';

interface UserData {
  name: string;
  email: string;
  password: string;
}

class UserModel {
  static validate(userData: UserData) {
    const { name, email, password } = userData;

    if (typeof name !== 'string' || name.length < 3 || name.length > 50) {
      throw new CustomAPIError('請提供有效的姓名');
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      throw new Error('請提供有效的信箱');
    }

    if (typeof password !== 'string' || password.length < 6) {
      throw new Error('請提供有效的密碼');
    }
  }

  static async create(userData: UserData) {
    UserModel.validate(userData);

    const { name, email, password } = userData;
    const queryStr =
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, password];

    try {
      const res = await query(queryStr, values);
      return res.rows[0];
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    }
  }

  static async findByEmail(email: string) {
    const queryStr = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    try {
      const res = await query(queryStr, values);
      return res.rows[0];
    } catch (err) {
      throw new Error('Error finding user: ' + err.message);
    }
  }
}

export default UserModel;
