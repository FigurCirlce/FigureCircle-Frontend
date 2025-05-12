import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../src/app/store'; // Adjust the path accordingly

import ProtectedRoutes from 'routes/protected/ProtectedRoutes';
import PublicRoutes from 'routes/public/PublicRoutes';
import PublicRoutesOutlet from 'routes/public/PublicRoutesOutlet';
import ProtectedRoutesOutlet from 'routes/protected/ProtectedRoutesOutlet';
import PageNotFound from './pages/404';

interface RouteI {
  path: string;
  component: React.ReactNode;
}

function App() {
  const storedUserString = localStorage.getItem('user');
  const user = storedUserString ? JSON.parse(storedUserString) : {}; // Provide a default value if null

  console.log("data", user)
  return (
    <main className="h-screen">
      <Provider store={store}>
        <ToastContainer />
        <Routes>
          <Route element={<ProtectedRoutesOutlet />}>
            {ProtectedRoutes(user)?.map((route: RouteI) => (
              <Route key={route.path} path={route.path} element={React.cloneElement(route.component as React.ReactElement, {
                user,
              })}
              />

            ))}
          </Route>
          <Route element={<PublicRoutesOutlet />}>
            {PublicRoutes?.map((route: RouteI) => (
              <Route key={route.path} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Provider>
    </main>
  );
}

export default App;
