import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NavBar from "../components/NavBar"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch } from "./store/configureStore"
import { fetchCurrentUserAsync } from "./store/accountSlice"
import LoadingScreen from "../components/ScreenLoader"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useAppDispatch()

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUserAsync())
    } catch (error) {
      console.log("error:", error)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setIsLoading(false))
  }, [initApp])

  return (
    <>
      <ToastContainer position="top-center" hideProgressBar theme="colored" />
      <NavBar />
      {isLoading ? <LoadingScreen message="Initializing app..." /> : <Outlet />}
    </>
  )
}

export default App
