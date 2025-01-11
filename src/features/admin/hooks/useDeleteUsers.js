import axiosInstance from '@/api/axios';

const useDeleteUsers = async (userIds) => {
  const { data } = await axiosInstance.delete('/users', {
    data: { ids: userIds },
  });

  return data;
};

export default useDeleteUsers;
