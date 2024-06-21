import query from '../db';
import { CustomAPIError } from '../errors';

interface JobData {
  company: string;
  position: string;
  status?: string;
  userId: number;
}

class JobModel {
  static validateCompany(company: string) {
    if (
      typeof company !== 'string' ||
      company.length < 1 ||
      company.length > 50
    ) {
      throw new CustomAPIError('請提供有效的公司名稱');
    }
  }

  static validatePosition(position: string) {
    if (
      typeof position !== 'string' ||
      position.length < 1 ||
      position.length > 100
    ) {
      throw new CustomAPIError('請提供有效的職位名稱');
    }
  }

  static validateStatus(status: string) {
    const validStatuses = ['interview', 'declined', 'pending'];
    if (!validStatuses.includes(status)) {
      throw new CustomAPIError('請提供有效的狀態');
    }
  }

  static async validate(jobData: JobData) {
    const { company, position, status } = jobData;
    JobModel.validateCompany(company);
    JobModel.validatePosition(position);
    if (status) {
      JobModel.validateStatus(status);
    }
  }

  static async create(jobData: JobData) {
    await JobModel.validate(jobData);

    const { company, position, status = 'pending', userId } = jobData;
    const queryStr = `
      INSERT INTO job (company, position, status, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [company, position, status, userId];

    const res = await query(queryStr, values);
    return res.rows[0];
  }

  static async getAll() {
    const queryStr = 'SELECT * FROM job ORDER BY job.createdat DESC;';
    const res = await query(queryStr);
    return res.rows;
  }

  static async findByUserId(user_id: number) {
    const queryStr = 'SELECT * FROM job WHERE user_id = $1;';
    const values = [user_id];
    const res = await query(queryStr, values);
    return res.rows;
  }

  static async findById(job_id: number) {
    const queryStr = 'SELECT * FROM job WHERE id = $1;';
    const values = [job_id];
    const res = await query(queryStr, values);
    return res.rows[0];
  }
}

export default JobModel;
