"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDb = exports.getDbConnection = void 0;
// src/database/database.ts
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
// Initialize or get database connection
const getDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sqlite_1.open)({
        filename: './users.db',
        driver: sqlite3_1.default.Database
    });
});
exports.getDbConnection = getDbConnection;
// Initialize the database
const initializeDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, exports.getDbConnection)();
    yield db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      city TEXT NOT NULL
    );
  `);
    return db;
});
exports.initializeDb = initializeDb;
