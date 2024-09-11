import sqlite3 from 'sqlite3';  

export const getDbConnection2 = (onSuccess: (db: sqlite3.Database) => void, onError: (err: Error | null) => void): void => {
    const db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE, function(err1: Error | null){
        if(err1){
            onError(err1);
            return;
        }
        onSuccess(db);
    });
};

export const initializeDb2 = (onSuccess: () => void, onError: (err: Error|null) => void): void => {
    const onSuccessInternal = (db: sqlite3.Database) => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT UNIQUE NOT NULL,
              age INTEGER NOT NULL,
              city TEXT NOT NULL
            );
            `, function(err: Error|null){
                if(err)
                    onError(err)
                else
                    onSuccess()
        })
    }
    getDbConnection2(onSuccessInternal, onError)
};
