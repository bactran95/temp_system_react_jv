import { PrivateRoute } from 'src/components/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Suspense } from 'react';
import NotFound from 'src/pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      {routes.map(({ Component, isPrivate, path, children, Layout }) => {
        return (
          <Route key={path} element={Layout}>
            <Route
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute>
                    <Suspense fallback={null}>
                      <Component />
                    </Suspense>
                  </PrivateRoute>
                ) : (
                  <Suspense fallback={null}>
                    <Component />
                  </Suspense>
                )
              }
            >
              {children?.map(
                (
                  {
                    path: childPath,
                    Component: ChildComponent,
                    props: childProps
                  },
                  childIndex
                ) => (
                  <Route
                    key={childIndex}
                    path={childPath}
                    element={
                      isPrivate ? (
                        <PrivateRoute>
                          <Suspense fallback={null}>
                            <ChildComponent {...childProps} />
                          </Suspense>
                        </PrivateRoute>
                      ) : (
                        <Suspense fallback={null}>
                          <ChildComponent {...childProps} />
                        </Suspense>
                      )
                    }
                  />
                )
              )}
            </Route>
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRouter;
