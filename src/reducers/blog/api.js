import { baseApi } from '../../app/api/base';

export const blogApi = baseApi({
  entityTypes: ['blogs'],
  reducerPath: 'blogs',
  resolvers: (builder) => ({})
});

export const {
  useLoadBlogsQuery,
  useLoadPagingBlogsQuery,
  useUpdateBlogsMutation,
  useDeleteBlogsMutation,
  useCreateBlogsMutation
} = blogApi;

export const {
  endpoints: { loadBlogs, loadPagingBlogs, updateBlogs, deleteBlogs, createBlogs }
} = blogApi;
