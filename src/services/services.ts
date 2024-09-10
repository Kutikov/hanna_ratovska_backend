import { Request, Response } from 'express';
import { getDbConnection } from '../db/database';
import {User} from "../types/usersType";
import {Database} from "sqlite";



export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const db: Database = await getDbConnection();
        const users: User[] | [] = await db.all('SELECT * FROM users');
        res.json(users);
    } catch (error: Error) {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);

    try {
        const db: Database = await getDbConnection();
        const user: User | undefined = await db.get('SELECT * FROM users WHERE id = ?', [id]);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: Error) {
        console.error('Error getting user:', error);
        res.status(500).send('Internal server error');
    }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { name, age, city } = req.body;

    if (!name || !age || !city) {
        res.status(400).send('Missing required fields');
        return;
    }

    try {
        const db: Database = await getDbConnection();
        const userExists: User | undefined = await db.get('SELECT * FROM users WHERE name = ?', [name]);

        if (userExists) {
            res.status(409).send('User already exists');
        } else {
            await db.run('INSERT INTO users (name, age, city) VALUES (?, ?, ?)', [name, age, city]);
            const newData: User[] = await db.all('SELECT * FROM users');
            res.json(newData);
        }
    } catch (error: Error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal server error');
    }
};

export const setUser = async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);
    const { age } = req.body;

    if (!age) {
        res.status(400).send('Missed age');
        return;
    }

    try {
        const db: Database = await getDbConnection();
        const userExists: User | undefined = await db.get('SELECT * FROM users WHERE id = ?', [id]);

        if (userExists) {
            await db.run('UPDATE users SET age = ? WHERE id = ?', [age, id]);
            const newData: User[] = await db.all('SELECT * FROM users');
            res.json(newData);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: Error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error');
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id: number = Number(req.params.id);

    try {
        const db: Database = await getDbConnection();
        const userExists: User | undefined = await db.get('SELECT * FROM users WHERE id = ?', [id]);

        if (userExists) {
            await db.run('DELETE FROM users WHERE id = ?', [id]);
            const newData: User[] = await db.all('SELECT * FROM users');
            res.json(newData);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: Error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error');
    }
};
