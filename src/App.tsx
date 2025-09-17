import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './layouts/layout';
import Home from './components/home';
import Infografia from './components/infografia';
import VideoGallery from './components/video-gallery';

import { ThemeProvider } from "@/components/theme-provider"

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
        {
          path: "videos",
          element: (
            <VideoGallery />
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

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App
