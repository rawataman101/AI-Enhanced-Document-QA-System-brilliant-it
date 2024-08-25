import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainProvider from "./contexts/MainContext.jsx";
import Chat from "./components/Chat/Chat.jsx";
import UploadPage from "./components/UploadPage/UploadPage.jsx";
import Header from "./components/Header/Header.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <UploadPage />
      </>
    ),
  },
  {
    path: "/chat",
    element: (
      <>
        <Header />
        <Chat />,
      </>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
);
