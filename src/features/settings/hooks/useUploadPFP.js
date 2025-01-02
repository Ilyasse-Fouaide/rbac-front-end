import axiosInstance from '@/api/axios';

const useUploadPFP = async (userId, formData) => {
  const { data } = await axiosInstance.post(
    `/profile/${userId}/avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export default useUploadPFP;
