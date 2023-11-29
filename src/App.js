import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
function App() {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* {privateRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return localStorage.getItem('user') ? (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        ) : (
                            (window.location.href = '/login')
                        );

                
                    })} */}

                    {
                        user
                            ? privateRoutes.map((route, index) => {
                                  const Page = route.component;
                                  let Layout = DefaultLayout;

                                  if (route.layout) {
                                      Layout = route.layout;
                                  } else if (route.layout === null) {
                                      Layout = Fragment;
                                  }
                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      />
                                  );
                              })
                            : privateRoutes.map((route, index) => {
                                  return <Route key={index} path={route.path} element={<Navigate to="/login" />} />;
                              })
                        // <Route path="/admin" element={} />
                    }

                    {
                        admin
                            ? adminRoutes.map((route, index) => {
                                  const Page = route.component;
                                  let Layout = DefaultLayout;

                                  if (route.layout) {
                                      Layout = route.layout;
                                  } else if (route.layout === null) {
                                      Layout = Fragment;
                                  }
                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      />
                                  );
                              })
                            : adminRoutes.map((route, index) => {
                                  return <Route key={index} path={route.path} element={<Navigate to="/login" />} />;
                              })
                        // <Route path="/admin" element={} />
                    }
                </Routes>
            </div>
        </Router>
    );
}

export default App;
