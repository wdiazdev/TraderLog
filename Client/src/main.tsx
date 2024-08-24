import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/router/Routes.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store/configureStore.ts"

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
  // </StrictMode>
)
