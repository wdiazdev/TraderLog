import LoginIcon from "@mui/icons-material/Login"
import AppInputField from "../components/AppInputField"
import { Link } from "react-router-dom"
import AppButton from "../components/AppButton"

export default function SignIn() {
  return (
    <div className="bg-bkg-1 w-full min-h-screen flex items-center justify-center p-4">
      <div
        className="bg-container w-[500px] pt-12 pb-12 
      flex flex-col items-center p-4 rounded-xl"
      >
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full 
        bg-bkg-1"
        >
          <LoginIcon className="text-accent-2" />
        </div>
        <h2 className="text-containerText text-[26px]"> Sign in</h2>

        <div className="w-full flex flex-col gap-6 mt-6">
          <AppInputField autoFocus placeholder="Enter your username" />
          <AppInputField placeholder="Enter your password" />

          <span className="text-containerText">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="hover:text-accent-2 transition-colors duration-200 ease-in-out"
            >
              Sign Up
            </Link>
          </span>

          <AppButton title="Sign In" />
        </div>
      </div>
    </div>
  )
}
