import { Router } from 'express';
import multiparty from 'connect-multiparty';
import { idSchema } from '../validations/validations';
import jobController from '../modules/jobs/controller/jobsController';
import { uploadService } from '../services/uploadService';
import { routeParamsValidation } from '../middlewares/requestMiddleware';

const multipart = multiparty();
const router: Router = Router();

router.get('/get-jobs', jobController.getJobs);
router.get('/get-job/:id', routeParamsValidation(idSchema), jobController.getJob);
router.delete('/delete-job/:id', routeParamsValidation(idSchema), jobController.deleteJob);
router.post('/create-job', multipart, uploadService, jobController.createJob);
router.patch('/update-job/:id', routeParamsValidation(idSchema), multipart, uploadService, jobController.updateJob);

export default router;
