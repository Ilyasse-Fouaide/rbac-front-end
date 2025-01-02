import axiosInstance from '@/api/axios';

const useUpdateProfile = async (userId, data) => {
  const res = await axiosInstance.patch(`/profile/${userId}`, data);
  return res.data;
};

export default useUpdateProfile;
