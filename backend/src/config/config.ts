import { Config } from '../types/db';
import dotenv from 'dotenv';

dotenv.config();

const config: Config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'subshare_dev',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'password',
    database: process.env.TEST_DB_NAME || 'subshare_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT || '5432'),
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USER || 'postgres',
    password: process.env.PROD_DB_PASSWORD || 'password',
    database: process.env.PROD_DB_NAME || 'subshare_prod',
    host: process.env.PROD_DB_HOST || 'localhost',
    port: parseInt(process.env.PROD_DB_PORT || '5432'),
    dialect: 'postgres'
  }
};

export default config;
