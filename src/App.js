import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Product from '~/pages/Client/Product';

function App() {
    const jwtToken = localStorage.getItem('jwtToken');
    let userId;
    if (jwtToken) {
        try {
            const decodedToken = jwtDecode(jwtToken);
            userId = decodedToken.Username;
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    }

    console.log(userId);
    return (
        <Router>
            <div className="App">
                {/* <div style={{ display: 'none' }}>
                    <Product id={2} />
                </div> */}

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

                    {userId == 'admin' || userId == 'user'
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
                          })}

                    {userId == 'admin'
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
                          })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
