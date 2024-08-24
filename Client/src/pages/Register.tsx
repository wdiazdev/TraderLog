import { Link } from "react-router-dom"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import AppButton from "../components/AppButton"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Box } from "@mui/material"

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  })

  return (
    <div className="bg-bkg-1 w-full min-h-screen flex items-center justify-center p-4">
      <div
        className="bg-container w-[500px] pt-12 pb-12 
      flex flex-col items-center justify-center p-4 rounded-xl"
      >
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full 
        bg-bkg-1"
        >
          <HowToRegIcon className="text-accent-2" />
        </div>
        <h2 className="text-containerText text-[26px]">Register</h2>

        <Box component="form" className="w-full flex flex-col gap-6 mt-6">
          {/* <AppTextInput control={control} name="email" label="Email" />
          <AppTextInput control={control} name="username" label="User Name" />
          <AppTextInput control={control} name="password" label="Password" type="password" /> */}

          <span className="text-containerText">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="hover:text-accent-2 transition-colors duration-200 ease-in-out"
            >
              Sign In
            </Link>
          </span>

          <AppButton title="Register" />
        </Box>
      </div>
    </div>
  )
}
