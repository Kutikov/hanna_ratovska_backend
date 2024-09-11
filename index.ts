import express, { Express } from 'express';
import userRoutes from './src/routers/userRoutes';
import { initializeDb2 } from './src/db/database';

const app: Express = express();
const PORT: number = 5000;

app.use(express.json());

app.use('/users', userRoutes);

initializeDb2((): void => {
    app.listen(PORT, (): void => {
        console.log(`Server is running on port ${PORT}`);
    });
    }, (err: Error|null): void => {
        console.error('Failed to initialize the database:', err);
        process.exit(1);
    })

