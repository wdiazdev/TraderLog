import useThemeMode from "../app/hooks/useThemeMode"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Link } from "react-router-dom"

export default function NavBar() {
  const { themeMode, toggleThemeMode } = useThemeMode()
  return (
    <div className="absolute top-0 left-0 z-10 w-full bg-bkg-2 p-4 flex items-center justify-between">
      <h2 className="text-[22px] text-accent-1">Project</h2>
      <div className="flex items-center gap-4 ">
        <Link to={"/"} className="text-accent-1 text-[20px]">
          Home
        </Link>
        <button onClick={toggleThemeMode}>
          {themeMode === "dark" ? (
            <LightModeOutlinedIcon className="text-accent-2" />
          ) : (
            <DarkModeOutlinedIcon className="text-accent-2" />
          )}
        </button>
        <button>
          <AccountCircleIcon className="text-accent-1" />
        </button>
      </div>
    </div>
  )
}
