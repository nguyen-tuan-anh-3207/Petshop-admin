import { baseApi } from '../../app/api/base';

export const categoryApi = baseApi({
  entityTypes: ['categories'],
  reducerPath: 'categories',
  resolvers: (builder) => ({})
});

export const {
  useLoadCategoriesQuery,
  useLoadPagingCategoriesQuery,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
  useCreateCategoriesMutation,
  useUploadFileMutation
} = categoryApi;

export const {
  endpoints: {
    loadCategories,
    loadPagingCategories,
    updateCategories,
    deleteCategories,
    createCategories
  }
} = categoryApi;
