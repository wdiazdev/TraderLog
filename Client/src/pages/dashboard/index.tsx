import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Performance from "./Performance";
import Settings from "./Settings";
import { TabOptions } from "../../model/dashboard";
import { useAppDispatch } from "../../app/store/configureStore";
import { fetchTradeAccountsAsync } from "../../app/store/userAccountsSlide";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const [currentTab, setCurrentTab] = useState<TabOptions>("performance");

  useEffect(() => {
    const fetchTradeAccounts = async () => {
      try {
        await dispatch(fetchTradeAccountsAsync());
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTradeAccounts();
  }, [dispatch]);

  const handleTabChange = (tab: TabOptions) => {
    setCurrentTab(tab);
  };

  return (
    <div className="flex gap-4 p-2 min-h-screen w-full bg-bkg-1">
      <SideBar handleTabChange={handleTabChange} />
      <div className="flex flex-col w-full mt-[68px] rounded-lg">
        {currentTab === "performance" ? (
          <Performance />
        ) : currentTab === "settings" ? (
          <Settings />
        ) : null}
      </div>
    </div>
  );
}
