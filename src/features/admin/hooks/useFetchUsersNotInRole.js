import axiosInstance from '@/api/axios';

const useFetchUsersNotInRole = async (role, search) => {
  const { data } = await axiosInstance.get(
    `/user-role/${role}?search=${search}`,
  );
  return data;
};

export default useFetchUsersNotInRole;
