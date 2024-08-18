import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Dashboard from "../../pages/dashboard/Dashboard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
])
