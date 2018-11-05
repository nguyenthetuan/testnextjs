import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchMaketingJobs = () => {
  return _api.GET(`${host}/client/apply_now`, _api.addTokenToHeader());
};

const fetchJobsByCategory = () => {
  return _api.GET(`${host}/client/categories`, _api.addTokenToHeader());
};

const fetchJobsByLocation = () => {
  return _api.GET(`${host}/client/locations/byCounts`, _api.addTokenToHeader());
};

const fetchJobDetail = id => {
  return _api.GET(`${host}/client/jobs/${id}`, _api.addTokenToHeader());
};

const saveJob = job => {
  return _api.POST(`${host}/client/candidate_save_jobs`, { job }, _api.addTokenToHeader());
};

const fetctAppliedJob = queryString => {
  let url = `${host}/candidate/jobs/apply_jobs`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

const fetctSavedJob = queryString => {
  let url = `${host}/candidate/jobs/candidate_save_jobs`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

const fetctSuitableJob = queryString => {
  let url = `${host}/candidate/jobs/suitable_jobs`;
  if (queryString) {
    url = `${url}?${queryString}`;
  }
  return _api.GET(url, _api.addTokenToHeader());
};

const applyJob = info => {
  return _api.POST(`${host}/client/job_applications`, info, _api.addTokenToHeader());
};

export default {
  fetchMaketingJobs,
  fetchJobsByCategory,
  fetchJobsByLocation,
  fetctAppliedJob,
  fetchJobDetail,
  fetctSavedJob,
  fetctSuitableJob,
  saveJob,
  applyJob
};
