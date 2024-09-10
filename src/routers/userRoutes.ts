import { Router } from 'express';
import { getAllUsers, getUser, addUser, setUser, deleteUser } from '../services/services';

const router: Router = Router();

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.put('/', addUser);

router.patch('/settings/:id', setUser);

router.delete('/:id', deleteUser);

export default router;