import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NewMoviePage, NotFoundPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/index.ts";
import { Footer } from "./components/footer/footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/createMovie",
    element: <NewMoviePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-zinc-900 w-full">
      <Header />
    </div>
    <RouterProvider router={router} />
    <ToastContainer />
    <Footer />
  </React.StrictMode>
);
