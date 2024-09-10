import sqlite3 from 'sqlite3';
import {Database, open} from 'sqlite';

export const getDbConnection = async (): Promise<Database> => {
    return open({
        filename: './users.db',
        driver: sqlite3.Database
    });
};

export const initializeDb = async (): Promise<Database> => {
    const db: Database = await getDbConnection();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      city TEXT NOT NULL
    );
  `);
    return db;
};
