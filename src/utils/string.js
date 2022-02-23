import _ from 'lodash';

export default {
  upperCaseFirstLetter(str) {
    return str?.length === 0 ? str : `${str[0].toUpperCase() + str.substr(1)}`;
  },
  strToCamelCase(str) {
    if (!str || str.length === 0) {
      return str;
    }

    return _.camelCase(str);
  }
};
