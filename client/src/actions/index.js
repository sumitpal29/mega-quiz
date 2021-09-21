import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';

import STATUS from '../constants/status';


export const processResponse = (res, onSuccess, onError) => {
  const response = _get(res, 'data');
  const status = _get(response, 'status');

  if (status === STATUS.SUCCESS) {
    const data = _get(response, 'data');
    if (_isFunction(onSuccess)) onSuccess(data);
    return data;
  }

  const error = _get(res, 'error');
  if (_isFunction(onError)) onError(error);
  return error;
}