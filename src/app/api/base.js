import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import utilsString from '../../utils/string';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL ?? 'https://pet-shop-220219.herokuapp.com/api'
});

const baseQueryWithIntercept = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const { data, error } = result;
  if (error) {
    // handle error
  }

  if (Object.is(data?.code, 0)) {
    return result;
  }
};

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
      baseUrl: process.env.REACT_APP_API_URL ?? 'https://pet-shop-220219.herokuapp.com/api'
    }),
    tagTypes,
    reducerPath,
    //  cache , The default time is seconds , Default duration 60 second
    keepUnusedDataFor: 5 * 60,
    refetchOnMountOrArgChange: 30 * 60,
    endpoints: (build) => {
      const resolverEndpoints = resolvers?.(build);

      console.log(resolverEndpoints);

      return {
        [`load${path}`]: build.query({
          query: (id) => `/${path}/${id}`,
          transformResponse: (response) => response.data,
          providesTags: (result) => {
            if (result) {
              const providers = entityTypes.map((type) => ({ type, _id: result._id }));
              return providers;
            }
            return [];
          }
        }),
        [`loadPaging${path}`]: build.query({
          query: () => `/${path}`,
          transformResponse: (response) => response.data,
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
            url: `/${path}`,
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
          query: ({ id, data }) => ({
            url: `/${path}/${id}`,
            method: 'PATCH',
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
            url: `/${path}/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: () => {
            const providers = [];
            entityTypes.forEach((type) => {
              providers.push({ type });
              providers.push({ type: `${type}Count` });
            });
            return providers;
          }
        }),
        ...resolverEndpoints
      };
    }
  });
};
