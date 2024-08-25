import LoginIcon from "@mui/icons-material/Login"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import { FieldValues, useForm } from "react-hook-form"
import { useAppDispatch } from "../app/store/configureStore"
import { signInUserAsync } from "../app/store/accountSlice"
import { Box, TextField } from "@mui/material"
import { toast } from "react-toastify"

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  })

  const submitForm = async (data: FieldValues) => {
    try {
      const result = await dispatch(signInUserAsync(data))
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful")
        navigate(location.state?.from || "/dashboard")
      } else {
        console.log("Dispatch was not successful")
      }
    } catch (error) {
      console.log("error:", error)
    }
  }

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
        <h2 className="text-containerText text-[26px]">Sign in</h2>

        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          className="w-full flex flex-col gap-2 mt-6"
        >
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            autoFocus
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors?.email?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />
          <span>
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="hover:text-accent-1 font-bold 
              transition-colors duration-200 ease-in-out"
            >
              Sign Up
            </Link>
          </span>

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "rgb(39,194,232)",
              color: "black",
              "&:hover": {
                backgroundColor: "rgb(71,204,237)", // Light red on hover
              },
            }}
          >
            Sign In
          </LoadingButton>
        </Box>
      </div>
    </div>
  )
}
