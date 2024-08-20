import { useState } from "react"
import SideBar from "../features/SideBar"
import TopBar from "../features/TopBar"
import Performance from "../features/Performance"
import Settings from "../features/Settings"
import { TabOptions } from "../model/dashboard"

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<TabOptions>("performance")

  const handleTabChange = (tab: TabOptions) => {
    setCurrentTab(tab)
  }

  return (
    <div className="flex">
      <SideBar handleTabChange={handleTabChange} />
      <div className="flex flex-col w-full min-h-screen bg-bkg-1 text-content p-4">
        <TopBar />
        {currentTab === "performance" ? (
          <Performance />
        ) : currentTab === "settings" ? (
          <Settings />
        ) : null}
      </div>
    </div>
  )
}
