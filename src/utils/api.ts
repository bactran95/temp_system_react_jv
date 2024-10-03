import ApiRequest from 'core-api';
import { API_URL } from 'src/enums/apiPath';
import { RoutePath } from 'src/enums/routePath';

export const apiRequest = new ApiRequest({
  baseUrl: API_URL,
  onUnauthenticated: () => window.location.replace(RoutePath.LOGIN)
});
