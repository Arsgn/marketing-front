import axios from "axios";

const API = "http://localhost:5005/api/v1";

export const getAvailable = async () => {
  const res = await axios.get(`${API}/available/get`);
  return res.data.data;
};

export const createAvailable = async (payload: any) => {
  const res = await axios.post(`${API}/available/post`, payload);
  return res.data;
};

export const deleteAvailable = async (id: number) => {
  return axios.delete(`${API}/available/delete/${id}`);
};
