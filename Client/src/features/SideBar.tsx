import { Avatar } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import { TabOptions } from "../model/dashboard"
import { chartOneUpperCase } from "../helper/chartOneUpperCase"
import dayjs from "dayjs"

interface Props {
  handleTabChange: (tab: TabOptions) => void
}

export default function SideBar({ handleTabChange }: Props) {
  const tabs: TabOptions[] = ["performance", "settings"]

  return (
    <div className="w-[260px] bg-bkg-2 rounded-lg">
      <div className="flex flex-col items-center">
        <h3 className="text-white text-[24px] text-center m-4">{dayjs().format("ddd, DD YYYY")}</h3>
        <Avatar
          sx={{
            bgcolor: "#34B1AA",
            fontSize: 32,
            width: 56,
            height: 56,
          }}
        >
          W
        </Avatar>
      </div>

      <div className="mt-12">
        {tabs.map((item) => (
          <button
            key={item}
            className="flex justify-start items-center gap-4 w-full p-4 hover:bg-bkg-1 transition-colors duration-200 ease-in-out"
            onClick={() => handleTabChange(item)}
          >
            {item === "performance" ? (
              <SettingsIcon className="text-accent-2" />
            ) : item === "settings" ? (
              <QueryStatsIcon className="text-accent-2" />
            ) : null}
            <p className="text-white text-[18px]">{chartOneUpperCase(item)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
