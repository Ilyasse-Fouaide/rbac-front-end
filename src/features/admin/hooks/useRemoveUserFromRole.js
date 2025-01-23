import axiosInstance from '@/api/axios';

const useRemoveUserFromRole = async (userIds, roleIds) => {
  const { data } = await axiosInstance.delete(
    '/user-role/remove-user-from-role',
    {
      data: { userIds, roleIds },
    },
  );
  return data;
};

export default useRemoveUserFromRole;
