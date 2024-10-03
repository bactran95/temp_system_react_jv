export interface PrivateRouteI {
  children: React.ReactElement;
}

export interface RouteI {
  Component: React.ElementType;
  Layout?: React.ReactElement;
  children?: RouteI[];
  isPrivate?: boolean;
  path: string;
  privateRouteProps?: PrivateRouteI;
  props?: object;
}
