import { baseApi } from '../../app/api/base';

export const orderApi = baseApi({
  entityTypes: ['orders'],
  reducerPath: 'orders',
  resolvers: (builder) => ({})
});

export const { useLoadOrdersQuery, useLoadPagingOrdersQuery, useDeleteOrdersMutation } = orderApi;

export const {
  endpoints: { loadOrders, loadPagingOrders, deleteOrders }
} = orderApi;
