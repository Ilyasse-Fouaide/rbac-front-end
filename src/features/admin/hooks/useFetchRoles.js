import axiosInstance from '@/api/axios';

const useFetchRoles = async () => {
  const { data } = await axiosInstance.get('/roles');
  return data;
};

export default useFetchRoles;
