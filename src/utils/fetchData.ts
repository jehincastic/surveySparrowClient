import Axios from 'axios';

export const postMethod = async <I, O>(endPoint: string, inputParams: I) => {
  const data = await Axios.post<O>(`/api${endPoint}`, inputParams, { withCredentials: true });
  return data.data;
};

export const getMethod = async <O>(endPoint: string) => {
  const data = await Axios.get<O>(`/api${endPoint}`, { withCredentials: true });
  return data.data;
};
