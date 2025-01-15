import axiosInstance from '@/api/axios';

const useFetchUserRoles = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}/roles`);
  return data;
};

export default useFetchUserRoles;
