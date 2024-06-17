import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import query from '../db';
import { CustomAPIError } from '../errors';

interface UserData {
  name: string;
  email: string;
  password: string;
}

class UserModel {
  static validateName(name: string) {
    if (typeof name !== 'string' || name.length < 3 || name.length > 50) {
      throw new CustomAPIError('請提供有效的姓名');
    }
  }

  static validateEmailFormat(email: string) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      throw new CustomAPIError('請提供有效的信箱');
    }
  }

  static async checkEmailDuplicate(email: string) {
    const results = await query('SELECT email FROM users WHERE email = $1', [
      email,
    ]);

    const isEmailDuplicate = results.rows.length > 0;

    if (isEmailDuplicate) {
      throw new CustomAPIError('此信箱已被註冊');
    }
  }

  static validatePassword(password: string) {
    if (typeof password !== 'string' || password.length < 6) {
      throw new CustomAPIError('請提供有效的密碼');
    }
  }

  static async validate(userData: UserData) {
    const { name, email, password } = userData;
    UserModel.validateName(name);
    UserModel.validateEmailFormat(email);
    await UserModel.checkEmailDuplicate(email);
    UserModel.validatePassword(password);
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static generateToken(user: { id: number; name: string; email: string }) {
    return jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_LIFETIME,
      },
    );
  }

  static async comparePassword(
    candidatePassword: string,
    userPassword: string,
  ) {
    const isMatch = await bcrypt.compare(candidatePassword, userPassword);
    return isMatch;
  }

  static async getAll() {
    const queryStr = 'SELECT * FROM users';
    const res = await query(queryStr);
    return res.rows;
  }

  static async create(userData: UserData) {
    await UserModel.validate(userData);
    const { name, email, password } = userData;
    const hashedPassword = await UserModel.hashPassword(password);

    const queryStr =
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, hashedPassword];

    const res = await query(queryStr, values);
    return res.rows[0];
  }

  static async findByEmail(email: string) {
    const queryStr = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const res = await query(queryStr, values);
    return res.rows[0];
  }
}

export default UserModel;
