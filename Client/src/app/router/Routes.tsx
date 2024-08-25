import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Dashboard from "../../pages/dashboard/Dashboard"
import Home from "../../pages/Home"
import Register from "../../pages/Register"
import SignIn from "../../pages/SignIn"

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
        element: <Dashboard />,
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
])
