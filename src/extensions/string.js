import { ORDER_STATUS } from '../constants';

export default {
  getLabel(status) {
    if (!status || status === ORDER_STATUS.PLACED) {
      return 'Đang đặt hàng';
    }
    if (status === ORDER_STATUS.CANCELED) {
      return 'Đã hủy đơn hàng';
    }
    return 'Đã vận chuyển';
  }
};
