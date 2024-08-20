import useThemeMode from "../app/hooks/useThemeMode"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

export default function TopBar() {
  const { themeMode, toggleThemeMode } = useThemeMode()
  return (
    <div className="flex items-center justify-between p-3 bg-bkg-2 rounded-lg">
      <h2 className="text-[22px] text-accent-2">Dashboard</h2>

      <div className="flex items-center gap-4 ">
        <button onClick={toggleThemeMode}>
          {themeMode === "dark" ? (
            <LightModeOutlinedIcon className="text-accent-2" />
          ) : (
            <DarkModeOutlinedIcon className="text-accent-2" />
          )}
        </button>
        <button>
          <AccountCircleIcon className="text-white" />
        </button>
      </div>
    </div>
  )
}
