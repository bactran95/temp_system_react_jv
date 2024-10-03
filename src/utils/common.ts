import { notifyMessage } from 'src/constants/message';
import { notification } from 'core-ui';
import { isString } from 'lodash';
import { ErrorResponse } from 'src/models/apiRequest';

export const handleError = (error: ErrorResponse) => {
  console.error({ error });

  const resMessage = error?.response?.data?.message;
  const errorMessage = isString(resMessage) ? resMessage : notifyMessage.failed;

  notification.error({
    message: errorMessage
  });
};
