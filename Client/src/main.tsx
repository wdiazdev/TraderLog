import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store/configureStore.ts"
import { router } from "./app/router/Routes.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
