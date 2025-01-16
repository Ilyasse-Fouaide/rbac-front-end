import axiosInstance from '@/api/axios';

const useDeleteRole = async (roleId) => {
  const { data } = await axiosInstance.delete(`/roles/${roleId}`);

  return data;
};

export default useDeleteRole;
