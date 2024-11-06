import { Router } from 'express';
import { getUsers,getUser, createUser , updatedUser,deleteUser} from '../controllers/users.controllers.js';

const router = Router();

router.get('/users',getUsers);

router.get('/users/:id',getUser);

router.post('/users', createUser);

router.put('/users/:id',updatedUser);

router.delete('/users/:id',deleteUser);

export default router;