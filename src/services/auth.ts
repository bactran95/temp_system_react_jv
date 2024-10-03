import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from 'src/constants/auth';
import { ApiPath } from 'src/enums/apiPath';
import { apiRequest } from 'src/utils/api';
import { jwtDecode } from 'jwt-decode';
import { LoginFormI } from 'src/models/auth';
import { RoutePath } from 'src/enums/routePath';
import { timestampToDate } from 'src/utils/date';

export const login = async (payload: LoginFormI) => {
  const res = await apiRequest.post({
    url: ApiPath.LOGIN,
    data: payload
  });

  const accessToken = res?.data?.data?.access_token;
  const decoded = jwtDecode(accessToken);
  const expiredDate = timestampToDate(Number(decoded?.exp));

  if (!!accessToken) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: expiredDate
    });
  }

  return res;
};

export const logout = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  window.location.replace(RoutePath.LOGIN);
};
