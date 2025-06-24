import candidates from '../../../database/models/candidates';

const createCandidate = async (body) => {
  return await candidates.create(body);
};

const findCandidateById = async (candidateId) => {
  return await candidates.findById(candidateId);
};

const findAllCandidates = async (filter = {}) => {
  return await candidates.find(filter).sort({ createdAt: -1 });
};

const updateCandidateById = async (candidateId, update) => {
  return await candidates.findByIdAndUpdate(candidateId, update, { new: true });
};

const deleteCandidateById = async (candidateId) => {
  return await candidates.findByIdAndDelete(candidateId);
};

export default {
  createCandidate,
  findCandidateById,
  findAllCandidates,
  updateCandidateById,
  deleteCandidateById,
};
