import Router from 'express';

import authRouter from './auth.routes.js';
import postRouter from './post.routes.js';
import commentRouter from './comment.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/post', postRouter);
apiRouter.use('/comment', commentRouter);

export default apiRouter;