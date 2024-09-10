import express, { Express } from 'express';
import userRoutes from './src/roures/userRoutes';
import { initializeDb } from './src/db/database';

const app: Express = express();
const PORT: number = 5000;

app.use(express.json());

app.use('/users', userRoutes);

initializeDb()
    .then((): void => {
        app.listen(PORT, (): void => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error): void => {
        console.error('Failed to initialize the database:', error);
        process.exit(1);
    });

