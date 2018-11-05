import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchCandidates = queryString => {
  let url = '/client/resumes';

  if (queryString) {
    url = `${url}?${queryString}`;
  }

  return _api.GET(`${host}${url}`, _api.addTokenToHeader());
};

const fetchCandidateInfo = (id, fastApplied = false) => {
  const url = fastApplied
    ? `${host}/client/job_applications/${id}`
    : `${host}/client/resumes/${id}`;
  return _api.GET(url, _api.addTokenToHeader());
};

const submitViewCandidateInfo = id => {
  return _api.POST(`${host}/client/resumes/view_information`, { id }, _api.addTokenToHeader());
};

const fetchSavedCandidates = queryString => {
  let url = `${host}/client/employer_save_profiles`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

const saveCandidateInfo = (resume, status) => {
  return _api.POST(
    `${host}/client/employer_save_profiles`,
    { resume, status },
    _api.addTokenToHeader()
  );
};
const fetchViewedCandidates = queryString => {
  let url = `${host}/client/package_resumes`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

const fetchAppliedCandidates = queryString => {
  let url = `${host}/client/job_applications`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

export default {
  fetchCandidates,
  fetchCandidateInfo,
  submitViewCandidateInfo,
  saveCandidateInfo,
  fetchSavedCandidates,
  fetchViewedCandidates,
  fetchAppliedCandidates
};
