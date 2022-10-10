import axiosClient from './axiosClient';

const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, params) => axiosClient.put(`memo/${id}`, params), // params:更新したい内容
};

export default memoApi;
