import StatusCodes from 'http-status-codes';
import responseUtils from '../../../utils/responseUtils';
import candidateRepository from '../repository/candidatesRepository';

const createCandidate = async (req, res) => {
  try {
    const profilePicture = req.body.file ? req.body.file : null;
    const candidate = await candidateRepository.createCandidate({ ...req.body, profile_picture: profilePicture });

    responseUtils.handleSuccess(StatusCodes.CREATED, 'Candidate created successfully.', candidate);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await candidateRepository.findAllCandidates();
    if (!candidates || candidates.length === 0) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Candidates not found.');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Candidates fetched successfully.', candidates);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getCandidate= async (req, res) => {
  try {
    const candidate = await candidateRepository.findCandidateById(req.params.id);
    if (!candidate) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Candidate not found');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Candidate fetched successfully.', candidate);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await candidateRepository.findCandidateById(req.params.id);
    if (!candidate) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Candidate not found for update');
      return responseUtils.response(res);
    }

    const updatedCandidate = await candidateRepository.updateCandidateById(req.params.id, req.body);
    if (!updatedCandidate) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Candidate not found for update');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Candidate updated successfully.', updatedCandidate);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await candidateRepository.findCandidateById(req.params.id);
    if (!candidate) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Candidate not found for deletion');
      return responseUtils.response(res);
    }

    const deletedCandidate = await candidateRepository.deleteCandidateById(req.params.id);
    if (!deletedCandidate) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Candidate not found for deletion');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Candidate deleted successfully.', deletedCandidate);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

export default {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
