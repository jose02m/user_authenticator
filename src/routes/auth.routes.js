import { Router } from 'express';

import { authRequired } from '../middlewares/validateToken.js';
import { login, register, logout, profile } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout)
authRouter.get('/profile', authRequired, profile); // This route requires authentication

export default authRouter;
// This file sets up the authentication routes for login and registration.