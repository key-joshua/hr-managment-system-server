import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { idSchema } from '../validations/validations';
import { uploadService } from '../services/uploadService';
import { routeParamsValidation } from '../middlewares/requestMiddleware';
import candidateController from '../modules/candidates/controller/candidatesController';

const multipart = multiparty();
const router: Router = Router();

router.get('/get-candidates', candidateController.getCandidates);
router.get('/get-candidate/:id', routeParamsValidation(idSchema), candidateController.getCandidate);
router.post('/create-job', multipart, uploadService, candidateController.createCandidate);
router.delete('/delete-candidate/:id', routeParamsValidation(idSchema), candidateController.deleteCandidate);
router.patch('/update-candidate/:id', routeParamsValidation(idSchema), multipart, uploadService, candidateController.updateCandidate);

export default router;
