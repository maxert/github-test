import { AppDataSource } from '@/config/database';

let initialized = false;

export const initDatabase = async () => {
  if (!initialized) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    initialized = true;
    console.log('📦 Database initialized');
  }
};
