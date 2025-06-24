import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { idSchema, jobSchema } from '../validations/validations';
import jobController from '../modules/jobs/controller/jobsController';
import { uploadMultipleDocumentsService } from '../services/uploadService';
import { routeBodyValidation, routeParamsValidation } from '../middlewares/requestMiddleware';

const multipart = multiparty();
const router: Router = Router();

router.get('/get-jobs', jobController.getJobs);
router.get('/get-job/:id', routeParamsValidation(idSchema), jobController.getJob);
router.delete('/delete-job/:id', routeParamsValidation(idSchema), jobController.deleteJob);
router.post('/create-job', multipart, uploadMultipleDocumentsService, routeBodyValidation(jobSchema), jobController.createJob);
router.patch('/update-job/:id', routeParamsValidation(idSchema), multipart, uploadMultipleDocumentsService, jobController.updateJob);

export default router;
