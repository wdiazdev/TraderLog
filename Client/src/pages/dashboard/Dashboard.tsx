import useThemeMode from "../../app/hooks/useThemeMode"
import SideBar from "../../components/SideBar"

export default function Dashboard() {
  const { toggleThemeMode, themeMode } = useThemeMode()
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-bkg-1 text-content min-h-screen flex items-center justify-center p-4">
        <button onClick={toggleThemeMode} className="px-4 py-2 rounded-lg bg-accent-2 text-white">
          {themeMode === "dark" ? "light" : "dark"}
        </button>
      </div>
    </div>
  )
}
