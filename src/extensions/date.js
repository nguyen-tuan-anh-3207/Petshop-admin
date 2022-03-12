import moment from 'moment';
import { DEFAULT_FORMAT_DATE_TIME } from '../constants/date';

export default {
  formatDateTime(date, format) {
    if (date) {
      return moment(date).format(format ?? DEFAULT_FORMAT_DATE_TIME);
    }
    return null;
  }
};
