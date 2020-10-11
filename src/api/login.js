import axios from 'axios';

export const getLoginApi = (data) => {
  return axios.post('/sign_in', data)
}