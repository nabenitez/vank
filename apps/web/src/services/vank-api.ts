import axios from 'axios';
const API_URL = 'https://whispering-scrubland-81882.herokuapp.com';

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 10 * 1000,
});

export const getInvoices = async (internalCode, query) => {
  return axiosClient
    .get(`invoice/${internalCode}`, { params: query })
    .then((res) => res.data);
};

export const updateSettings = async (body) => {
  return axiosClient.patch('client', body);
};
