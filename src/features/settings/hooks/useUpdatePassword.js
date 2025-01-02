import axiosInstance from '@/api/axios';

const useUpdatePassword = async (userId, data) => {
  const res = await axiosInstance.patch(`/profile/${userId}/password`, data);
  return res.data;
};

export default useUpdatePassword;
