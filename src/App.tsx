import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './layouts/layout';
import Home from './components/home';
import Infografia from './components/infografia';

function App() {
const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
         index: true, element: (
               <Home />
           ),
         },
         {
           path: "home",
           element: (
               <Home />
           ),
         },
         {
           path: "info",
           element: (
               <Infografia />
           ),
         },
        // {
        //   path: "calendar",
        //   element: (
        //       <Calendar />
        //   ),
        // },
      ],
    },
    // { path: "*", element: <NotFoundPage />, },
  ]);

  return (
        <RouterProvider router={router} />
  );
}

export default App
