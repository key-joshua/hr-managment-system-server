
import { Router } from 'express';
import jobRoute from './jobRoute';
import authRoute from './authRoute';
import candidateRoute from './candidateRoute';

import { authorizationSchema } from '../validations/validations';
import { routeHeaderValidation } from '../middlewares/requestMiddleware';
import { isAuthenticated } from '../middlewares/authenticationMiddleware';

const router: Router = Router();

router.use('/auth', authRoute);
router.use('/jobs', routeHeaderValidation(authorizationSchema), isAuthenticated, jobRoute);
router.use('/candidates', routeHeaderValidation(authorizationSchema), isAuthenticated, candidateRoute);

export default router;
