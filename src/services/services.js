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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.setUser = exports.addUser = exports.getUser = exports.getAllUsers = void 0;
const database_1 = require("../db/database");
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.getDbConnection)();
        const users = yield db.all('SELECT * FROM users');
        res.json(users);
    }
    catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
});
exports.getAllUsers = getAllUsers;
// Get a single user by id
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const db = yield (0, database_1.getDbConnection)();
        const user = yield db.get('SELECT * FROM users WHERE id = ?', [id]);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (error) {
        console.error('Error getting user:', error);
        res.status(500).send('Internal server error');
    }
});
exports.getUser = getUser;
// Add a new user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, city } = req.body;
    if (!name || !age || !city) {
        res.status(400).send('Missing required fields');
        return;
    }
    try {
        const db = yield (0, database_1.getDbConnection)();
        const userExists = yield db.get('SELECT * FROM users WHERE name = ?', [name]);
        if (userExists) {
            res.status(409).send('User already exists');
        }
        else {
            yield db.run('INSERT INTO users (name, age, city) VALUES (?, ?, ?)', [name, age, city]);
            const newUsers = yield db.all('SELECT * FROM users');
            res.json(newUsers);
        }
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal server error');
    }
});
exports.addUser = addUser;
// Update a user's age by id
const setUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { age } = req.body;
    if (!age) {
        res.status(400).send('Missing age');
        return;
    }
    try {
        const db = yield (0, database_1.getDbConnection)();
        const userExists = yield db.get('SELECT * FROM users WHERE id = ?', [id]);
        if (userExists) {
            yield db.run('UPDATE users SET age = ? WHERE id = ?', [age, id]);
            const updatedUsers = yield db.all('SELECT * FROM users');
            res.json(updatedUsers);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error');
    }
});
exports.setUser = setUser;
// Delete a user by id
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const db = yield (0, database_1.getDbConnection)();
        const userExists = yield db.get('SELECT * FROM users WHERE id = ?', [id]);
        if (userExists) {
            yield db.run('DELETE FROM users WHERE id = ?', [id]);
            const remainingUsers = yield db.all('SELECT * FROM users');
            res.json(remainingUsers);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
});
exports.deleteUser = deleteUser;
