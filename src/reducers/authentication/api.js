import { baseApi } from '../../app/api/base';

export const authApi = baseApi({
  entityTypes: ['login'],
  reducerPath: 'login',
  resolvers: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login_admin`,
        body: data,
        method: 'POST'
      }),
      transformResponse: (response) => response
    })
  })
});

export const { useLoginMutation } = authApi;

export const {
  endpoints: { login }
} = authApi;
