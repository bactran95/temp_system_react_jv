import { User } from 'src/models/user';
import { ApiPath } from 'src/enums/apiPath';
import { apiRequest } from 'src/utils/api';

export const getUsers = async (params: { page: number; limit: number }) => {
  const res = await apiRequest.get({
    url: ApiPath.USER,
    params
  });

  return res.data;
};

export const createUser = async (user: User) => {
  await apiRequest.post({
    url: ApiPath.USER,
    data: user
  });
};

export const updateUser = async (user: User) => {
  await apiRequest.put({
    url: `${ApiPath.USER}/${user.id}`,
    data: user
  });
};

export const deleteUser = async (user: User) => {
  await apiRequest.delete({
    url: `${ApiPath.USER}/${user.id}`
  });
};

export const lockUser = async (user: User) => {
  await apiRequest.put({
    url: `${ApiPath.USER}/${user.id}/lock`
  });
};

export const unlockUser = async (user: User) => {
  await apiRequest.put({
    url: `${ApiPath.USER}/${user.id}/unlock`
  });
};
