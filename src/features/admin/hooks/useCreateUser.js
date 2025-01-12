import axiosInstance from '@/api/axios';

const useCreateUser = async (payload) => {
  const { data } = await axiosInstance.post('/users', payload);
  return data;
};

export default useCreateUser;
