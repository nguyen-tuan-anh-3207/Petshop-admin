import { baseApi } from '../../app/api/base';

export const productApi = baseApi({
  entityTypes: ['products'],
  reducerPath: 'products',
  resolvers: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => {
        console.log('upload...', data);
        return {
          url: '/upload',
          body: data,
          method: 'POST'
        };
      },
      transformResponse: (response) => response
    }),
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: '/products',
          body: data,
          method: 'POST'
        };
      },
      transformResponse: (response) => response
    })
  })
});

export const {
  useLoadProductQuery,
  useLoadPagingProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUploadFileMutation
} = productApi;

export const {
  endpoints: { loadProduct, loadPagingProduct, updateProduct, deleteProduct, createProduct }
} = productApi;
