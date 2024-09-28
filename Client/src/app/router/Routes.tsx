import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import SignIn from "../../pages/SignIn";
import ScreenLoader from "../../components/ScreenLoader";

const Dashboard = lazy(() => import("../../pages/dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<ScreenLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
