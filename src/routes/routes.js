import Router from 'express';

import blogRouter from './blog.routes.js';  
import userRouter from './user.routes.js';
import authRouter from './auth.routes.js';

const apiRouter = Router();

apiRouter.use('/blog', blogRouter); // Mount the blog router on the /blog path
apiRouter.use('/user', userRouter); // Mount the user router on the /user path
apiRouter.use('/auth', authRouter); // Mount the auth router on the /auth path

apiRouter.get('/', (req, res) => {
    res.send('API Home Page');
}); 

export default apiRouter;
// This file sets up the main API router and mounts the blog routes on it.