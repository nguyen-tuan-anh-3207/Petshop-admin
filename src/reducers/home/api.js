import { baseApi } from '../../app/api/base';

export const homeApi = baseApi({
  entityTypes: ['home'],
  reducerPath: 'home',
  resolvers: (builder) => ({})
});

export const { useLoadHomeQuery, useLoadPagingHomeQuery, useDeleteHomeMutation } = homeApi;

export const {
  endpoints: { loadHome, loadPagingHome, deleteHome }
} = homeApi;
