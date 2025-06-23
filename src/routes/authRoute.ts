import { Router } from 'express';
import multiparty from 'connect-multiparty';
import uploadFileService from '../services/uploadFileService';
import authController from '../modules/auth/controller/authController';
import { isAuthenticated } from '../middlewares/authenticationMiddleware';
import { routeBodyValidation, routeHeaderValidation, routeParamsValidation } from '../middlewares/requestMiddleware';
import { isUserExist, isAccountVerified, isCredentialExist, isSessionVerified } from '../middlewares/authorizationMiddleware';
import { signupSchema, userDeviceSchema, signinSchema, authorizationSchema, sendEmailSchema, passwordSchema, accessTokenSchema, sendVerificationMailSchema } from '../modules/auth/validation/authValidation';

const multipart = multiparty();
const router: Router = Router();

router.post('/signin', routeHeaderValidation(userDeviceSchema), routeBodyValidation(signinSchema), isCredentialExist, authController.signin);
router.delete('/signout', routeHeaderValidation(authorizationSchema), routeHeaderValidation(userDeviceSchema), isAuthenticated, authController.signout);
router.post('/signup', multipart, routeHeaderValidation(userDeviceSchema),  uploadFileService, routeBodyValidation(signupSchema), isUserExist, authController.signup);

router.get('/verify-email/:access_token', routeParamsValidation(accessTokenSchema), isAccountVerified, authController.verifyEmail);
router.patch('/reset-password/:access_token', routeParamsValidation(accessTokenSchema), isSessionVerified, routeBodyValidation(passwordSchema), authController.resetPassword);
router.post('/send-verification-link/:action', routeHeaderValidation(userDeviceSchema), routeParamsValidation(sendVerificationMailSchema), routeBodyValidation(sendEmailSchema), authController.sendVerificationLink);

export default router;
