import _api from './_request';
import ApiConfig from '../constants/server-config';

const { API_HOST } = ApiConfig;
const host = API_HOST.replace(/\/$/, '');

const fetchHomeData = location => {
  let url = `${host}/client/home`;
  if (location) {
    const { latitude, longitude } = location;
    url = `${url}?latitude=${latitude}&longitude=${longitude}`;
  }

  return _api.GET(url, _api.addTokenToHeader());
};

const secretKey = 'bb21e610be64521bd82fe5316a64eb914a9f088d037d86cfbe1e63129137699deba2727244fe59a1370b40de7fa4ccce52ab867d51911f0fcd3bb5de448e78b9';
const fetchClientAddress = (latitude, longitude) => {
  return _api.POST(`${host}/client/geocoder/reverse`, { latitude, longitude, secretKey }, _api.addTokenToHeader());
};

export default { fetchHomeData, fetchClientAddress };
