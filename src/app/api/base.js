import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../utils/cookie';
import utilsString from '../../utils/string';

export const baseApi = ({ reducerPath, entityTypes, resolvers }) => {
  const path = utilsString.upperCaseFirstLetter(utilsString.strToCamelCase(reducerPath));

  const tagTypes = [];
  if (entityTypes?.length > 0) {
    entityTypes.forEach((type) => {
      tagTypes.push(type);
    });
  }
  return createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:8080/api',
      prepareHeaders: (headers, { getState }) => {
        const accessToken = getCookie('token');
        if (accessToken) {
          headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
      }
    }),
    tagTypes,
    reducerPath,
    //  cache , The default time is seconds , Default duration 60 second
    keepUnusedDataFor: 5 * 60,
    refetchOnMountOrArgChange: 30 * 60,
    endpoints: (build) => {
      const resolverEndpoints = resolvers?.(build);

      return {
        [`load${path}`]: build.query({
          query: (id) => `/${reducerPath}/${id}`,
          transformResponse: (response) => response,
          providesTags: (result) => {
            if (result) {
              const providers = entityTypes.map((type) => ({ type, _id: result._id }));
              return providers;
            }
            return [];
          }
        }),
        [`loadPaging${path}`]: build.query({
          query: () => `/${reducerPath}`,
          transformResponse: (response) => response.result,
          providesTags: (result) => {
            const provides = [];
            if (result?.length > 0) {
              result.forEach(({ _id }) => {
                entityTypes.forEach((type) => {
                  provides.push({ type, _id });
                });
              });
            } else {
              entityTypes.forEach((type) => {
                provides.push({ type });
              });
            }
            return provides;
          }
        }),
        [`create${path}`]: build.mutation({
          query: (data) => ({
            url: `/${reducerPath}`,
            body: data,
            method: 'POST'
          }),
          invalidatesTags: () => {
            const providers = [];
            entityTypes.forEach((type) => {
              providers.push({ type });
            });
            return providers;
          }
        }),
        [`update${path}`]: build.mutation({
          query: (data) => ({
            url: `/${reducerPath}`,
            method: 'PUT',
            body: data
          }),
          invalidatesTags: (result, error, { id }) => {
            const providers = [];
            entityTypes.forEach((type) => {
              providers.push({ type, _id: id });
            });
            // const providers = entityTypes.map(type => ({ type, _id: id }))
            return providers;
          }
        }),
        [`delete${path}`]: build.mutation({
          query: (id) => ({
            url: `/${reducerPath}/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: () => {
            const providers = [];
            entityTypes.forEach((type) => {
              providers.push({ type });
            });
            return providers;
          }
        }),
        ...resolverEndpoints
      };
    }
  });
};
