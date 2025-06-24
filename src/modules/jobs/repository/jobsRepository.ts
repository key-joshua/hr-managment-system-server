import jobs from '../../../database/models/jobs';

const createJob = async (body) => {
  return await jobs.create(body);
};

const findJobById = async (jobId) => {
  return await jobs.findById(jobId);
};

const findAllJobs = async (filter = {}) => {
  return await jobs.find(filter).sort({ createdAt: -1 });
};

const updateJobById = async (jobId, update) => {
  return await jobs.findByIdAndUpdate(jobId, update, { new: true });
};

const deleteJobById = async (jobId) => {
  return await jobs.findByIdAndDelete(jobId);
};

export default {
  createJob,
  findJobById,
  findAllJobs,
  updateJobById,
  deleteJobById,
};
