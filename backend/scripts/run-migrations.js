import { sequelize } from '../src/models/index.ts';

async function runMigrations() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  } finally {
    await sequelize.close();
  }
}

runMigrations();
