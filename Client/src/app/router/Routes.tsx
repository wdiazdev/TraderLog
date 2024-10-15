import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "../App"
import Home from "../../pages/Home"
import ScreenLoader from "../../components/ScreenLoader"
import NotFound from "../errors/NotFound"
import SignIn from "../../pages/SignIn"
import Register from "../../pages/Register"

const Dashboard = lazy(() => import("../../pages/dashboard"))

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
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
])
