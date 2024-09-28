import AppButton from "../components/AppButton";
import { router } from "../app/router/Routes";
import { useAppSelector } from "../app/store/configureStore";

export default function Home() {
  const { user } = useAppSelector((state) => state.account);
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-home-bg bg-cover bg-center bg-no-repeat">
      <h1 className="text-[40px] text-content">Home</h1>
      <div className="flex gap-2">
        {!user?.token && (
          <>
            <AppButton
              title="Login"
              onClick={() => router.navigate("/login")}
            />
            <AppButton
              title="Register"
              onClick={() => router.navigate("/register")}
            />
          </>
        )}
        {user?.token && (
          <AppButton
            title="Dashboard"
            onClick={() => router.navigate("/dashboard")}
          />
        )}
      </div>
    </div>
  );
}
