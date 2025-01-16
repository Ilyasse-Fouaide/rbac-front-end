import axiosInstance from '@/api/axios';

const useFetchRole = async (roleId) => {
  const { data } = await axiosInstance.get(`/roles/${roleId}`);
  return data;
};

export default useFetchRole;
