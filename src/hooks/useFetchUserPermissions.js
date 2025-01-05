import axiosInstance from '@/api/axios';

const useFetchUserPermissions = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}/permissions`);
  return data;
};

export default useFetchUserPermissions;
