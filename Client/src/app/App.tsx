import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Outlet />
    </>
  )
}

export default App
