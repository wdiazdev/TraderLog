import { Avatar } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import { TabOptions } from "../model/dashboard"
import { chartOneUpperCase } from "../helper/chartOneUpperCase"
import dayjs from "dayjs"
import useJwtDecode from "../app/hook/useJwtDecode"

interface Props {
  handleTabChange: (tab: TabOptions) => void
}

const tabs: TabOptions[] = ["performance", "settings"]

export default function SideBar({ handleTabChange }: Props) {
  const { claimData } = useJwtDecode("name")

  return (
    <div className="w-[260px] bg-bkg-2 rounded-lg">
      <div className="flex flex-col items-center">
        <h3 className="text-white text-[24px] text-center m-4">{dayjs().format("ddd, DD YYYY")}</h3>
        {claimData && (
          <Avatar
            sx={{
              bgcolor: "rgb(39,194,232)",
              fontSize: 32,
              width: 56,
              height: 56,
            }}
          >
            {claimData.charAt(0).toUpperCase()}
          </Avatar>
        )}
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
