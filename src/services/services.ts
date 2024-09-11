import { Request, Response } from 'express';
import { getDbConnection2 } from '../db/database';
import { User } from "../types/usersType";
import sqlite3 from "sqlite3";

const internalAllUsers = (res: Response, db: sqlite3.Database, onError: (err: Error | null) => void) => {
    db.all<User>('SELECT * FROM users', [], function(err: Error|null, rows: User[]) {
        if(err){
            onError(err);
            return;
        }
        res.json(rows);
    });
    db.close();
}

export const getAllUsers = (_: Request, res: Response): void => {
    const onSuccess = (db: sqlite3.Database): void => {
        internalAllUsers(res, db, onError);
    }
    const onError = (error: Error | null): void => {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
    getDbConnection2(onSuccess, onError);
};

export const getUser = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    if(isNaN(id)){
        res.status(400).send('Wrong id format');
    }
    const onSuccess = (db: sqlite3.Database): void => {
        db.get<User>('SELECT * FROM users WHERE id = ?', [id], function(err: Error|null, row?: User) {
            if(err){
                onError(err);
                return;
            }
            if(!row){
                res.status(404).send('Not found user');
                return;
            }
            res.json(row);
        });
        db.close();
    }
    const onError = (error: Error | null): void => {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
    getDbConnection2(onSuccess, onError);
};

export const addUser = (req: Request, res: Response): void => {
    const { name, age, city } = req.body;
    if (!name || !age || !city) {
        res.status(400).send('Missing required fields');
        return;
    }
    const onSuccess = (db: sqlite3.Database): void => {
        db.run('INSERT INTO users (name, age, city) VALUES (?, ?, ?)', [name, age, city], function (err: Error|null) {
            if(err){
                res.status(409).send('Duplicate user');
                db.close();
                return;
            }
            internalAllUsers(res, db, onError);
        });
    }
    const onError = (error: Error | null): void => {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
    getDbConnection2(onSuccess, onError);
};

export const setUser = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const { age } = req.body;
    if (isNaN(Number(age))) {
        res.status(400).send('Missed age');
        return;
    }
    const onSuccess = (db: sqlite3.Database): void => {
        db.run('UPDATE users SET age = ? WHERE id = ?', [age, id], function (err: Error|null) {
            if(err){
                onError(err);
                return;
            }
            if(this.changes){
                internalAllUsers(res, db, onError);
            }
            else{
                res.status(404).send('Not found to update')
            }
        });
    }
    const onError = (error: Error | null): void => {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
    getDbConnection2(onSuccess, onError);
};

export const deleteUser = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    if(isNaN(id)){
        res.status(400).send('wrong id');
        return;
    }
    const onSuccess = (db: sqlite3.Database): void => {
        db.run('DELETE FROM users WHERE id = ?', [id], function (err: Error|null) {
            if(err){
                onError(err);
                return;
            }
            if(this.changes){
                internalAllUsers(res, db, onError);
            }
            else{
                res.status(404).send('Not found to update')
            }
        });
    }
    const onError = (error: Error | null): void => {
        console.error('Error getting users:', error);
        res.status(500).send('Internal server error');
    }
    getDbConnection2(onSuccess, onError);
};
