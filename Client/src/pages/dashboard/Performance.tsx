import { useAppSelector } from "../../app/store/configureStore";
import PerformanceWidget from "../../components/PerformanceWidget";
import ScreenLoader from "../../components/ScreenLoader";

export default function Performance() {
  const { status, accounts } = useAppSelector((state) => state.tradeAccounts);
  console.log("accounts:", accounts);

  if (status === "pendingFetchTradeAccounts") return <ScreenLoader size={28} />;

  return (
    <>
      {accounts && accounts.length > 0 ? (
        <div className="flex flex-col items-center h-full p-4">
          <p className="text-white">Select Account</p>
          <div className="flex items-center justify-start gap-4 w-full">
            <h2 className="text-white">Account : {accounts[0].name}</h2>
          </div>
          <div className="flex justify-between items-center gap-6 w-auto">
            <PerformanceWidget label="Total P&L" value="$5,378.53" />
            <PerformanceWidget label="% Profitable" value="0.61" />
            <PerformanceWidget label="Trade win %" value="0.73" />
          </div>
        </div>
      ) : (
        <div className="flex items-center h-full p-4">
          <p className="text-white">
            No Accounts Found. Please create a new account.
          </p>
        </div>
      )}
    </>
  );
}
