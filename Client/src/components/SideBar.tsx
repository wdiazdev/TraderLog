import SettingsIcon from "@mui/icons-material/Settings";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { TabOptions } from "../model/dashboard";
import { chartOneUpperCase } from "../helper/chartOneUpperCase";
import dayjs from "dayjs";

interface Props {
  handleTabChange: (tab: TabOptions) => void;
}

const tabs: TabOptions[] = ["performance", "accounts", "settings"];

export default function SideBar({ handleTabChange }: Props) {
  return (
    <div className="w-[240px] bg-bkg-2 rounded-lg mt-[52px]">
      <div className="flex flex-col items-center">
        <h3 className="text-white text-[24px] text-center m-4">
          {dayjs().format("ddd, DD YYYY")}
        </h3>
      </div>
      <div className="mt-8">
        {tabs.map((item) => (
          <button
            key={item}
            className="flex justify-start items-center gap-2 w-full p-4 hover:bg-bkg-1 transition-colors duration-200 ease-in-out"
            onClick={() => handleTabChange(item)}
          >
            {item === "performance" ? (
              <QueryStatsIcon className="text-accent-2" />
            ) : item === "accounts" ? (
              <ManageAccountsIcon className="text-accent-2" />
            ) : item === "settings" ? (
              <SettingsIcon className="text-accent-2" />
            ) : null}
            <p className="text-white text-[18px]">
              {item === "accounts"
                ? "Manage Accounts"
                : chartOneUpperCase(item)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
