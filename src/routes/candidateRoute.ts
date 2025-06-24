import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { candidateSchema, idSchema } from '../validations/validations';
import { uploadSingleFileService } from '../services/uploadService';
import { routeBodyValidation, routeParamsValidation } from '../middlewares/requestMiddleware';
import candidateController from '../modules/candidates/controller/candidatesController';

const multipart = multiparty();
const router: Router = Router();

router.get('/get-candidates', candidateController.getCandidates);
router.get('/get-candidate/:id', routeParamsValidation(idSchema), candidateController.getCandidate);
router.delete('/delete-candidate/:id', routeParamsValidation(idSchema), candidateController.deleteCandidate);
router.post('/create-job', multipart, uploadSingleFileService, routeBodyValidation(candidateSchema), candidateController.createCandidate);
router.patch('/update-candidate/:id', routeParamsValidation(idSchema), multipart, uploadSingleFileService, candidateController.updateCandidate);

export default router;
