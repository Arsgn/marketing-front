import axios from "axios";

const API = "http://localhost:5005/api/v1";

export const getPopular = async () => {
  const res = await axios.get(`${API}/popular/get`);
  return res.data.data;
};

export const createPopular = async (payload: any) => {
  const res = await axios.post(`${API}/popular/post`, payload);
  return res.data;
};

export const deletePopular = async (id: number) => {
  return axios.delete(`${API}/popular/delete/${id}`);
};
