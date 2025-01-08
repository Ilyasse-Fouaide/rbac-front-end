import axiosInstance from '@/api/axios';

const useFetchUsers = async (queryParams) => {
  const { search, page, limit, select, sort } = queryParams;
  const searchParams = `/users?search=${search}&page=${page}&limit=${limit}&select=${select.join(',')}&sort=${sort.join(',')}`;
  const { data } = await axiosInstance.get(searchParams);
  return data;
};

export default useFetchUsers;
