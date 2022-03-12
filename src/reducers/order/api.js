import { baseApi } from '../../app/api/base';

export const orderApi = baseApi({
  entityTypes: ['orders'],
  reducerPath: 'orders',
  resolvers: (builder) => ({
    getOrdersByUser: builder.query({
      query: (data) => {
        console.log('data......', data);

        let url = '/orders/user/';

        if (data?.id) {
          url += `${data.id}`;
        }
        if (data?.page) {
          url += `?page=${data.page}`;
        }
        if (data?.limit) {
          url += `&limit=${data.limit}`;
        }

        return {
          url,
          method: 'GET'
        };
      },
      transformResponse: (response) => response.result
    })
  })
});

export const {
  useLoadOrdersQuery,
  useLoadPagingOrdersQuery,
  useDeleteOrdersMutation,
  useUpdateOrdersMutation,
  useGetOrdersByUserQuery
} = orderApi;

export const {
  endpoints: { loadOrders, loadPagingOrders, deleteOrders, updateOrders, getOrdersByUser }
} = orderApi;
