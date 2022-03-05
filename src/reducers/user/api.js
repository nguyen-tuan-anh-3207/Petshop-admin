import { baseApi } from '../../app/api/base';

export const userApi = baseApi({
  entityTypes: ['users'],
  reducerPath: 'users',
  resolvers: (builder) => ({})
});

export const {
  useLoadUsersQuery,
  useLoadPagingUsersQuery,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
  useCreateUsersMutation,
  useUploadFileMutation
} = userApi;

export const {
  endpoints: { loadUsers, loadPagingUsers, updateUsers, deleteUsers, createUsers }
} = userApi;
