import axiosInstance from '@/api/axios';

const useAssignUserToRole = async (array) => {
  const { data } = await axiosInstance.post('/user-role/assign-user-to-role', {
    array,
  });
  return data;
};

export default useAssignUserToRole;
