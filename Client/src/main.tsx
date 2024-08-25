import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store/configureStore.ts"
import { router } from "./app/router/Routes.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
