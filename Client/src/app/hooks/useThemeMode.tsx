import { useEffect, useState } from "react"

export default function useThemeMode() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("themeMode") as "light" | "dark") || "dark",
  )

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode)

    if (themeMode === "light") {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    }
  }, [themeMode])

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
  }
  return { toggleThemeMode, themeMode }
}
