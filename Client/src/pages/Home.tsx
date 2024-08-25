import AppButton from "../components/AppButton"
import { router } from "../app/router/Routes"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-bkg-1">
      <h1 className="text-[40px] text-content">Home</h1>
      <div className="flex gap-2">
        <AppButton title="Login" onClick={() => router.navigate("/login")} />
        <AppButton title="Register" onClick={() => router.navigate("/register")} />
        <AppButton title="Dashboard" onClick={() => router.navigate("/dashboard")} />
      </div>
    </div>
  )
}
