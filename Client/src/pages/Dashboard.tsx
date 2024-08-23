import { useState } from "react"
import SideBar from "../features/SideBar"
import Performance from "../features/Performance"
import Settings from "../features/Settings"
import { TabOptions } from "../model/dashboard"

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<TabOptions>("performance")

  const handleTabChange = (tab: TabOptions) => {
    setCurrentTab(tab)
  }

  return (
    <div className="flex gap-4 p-4 min-h-screen w-full bg-bkg-1">
      <SideBar handleTabChange={handleTabChange} />
      <div className="flex flex-col w-full">
        {currentTab === "performance" ? (
          <Performance />
        ) : currentTab === "settings" ? (
          <Settings />
        ) : null}
      </div>
    </div>
  )
}
