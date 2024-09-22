import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import PerformanceWidget from "../../components/PerformanceWidget";
import ScreenLoader from "../../components/ScreenLoader";
import Select from "react-select";

type AccountOption = {
  label: string;
  value: number;
};

export default function Performance() {
  const { status, accounts } = useAppSelector((state) => state.tradeAccounts);

  const [selectedAccount, setSelectedAccount] = useState<AccountOption | null>(
    null
  );

  useEffect(() => {
    if (accounts?.length && status === "idle") {
      setSelectedAccount({
        label: accounts[0].name,
        value: accounts[0].id,
      });
    }
  }, [accounts, status]);

  if (status === "pendingFetchTradeAccounts") return <ScreenLoader size={28} />;

  if (!accounts?.length) {
    return (
      <div className="flex items-center h-full p-4">
        <p className="text-white">
          No Accounts Found. Please create a new account.
        </p>
      </div>
    );
  }

  const accountOptions =
    accounts?.map((a) => ({
      label: a.name,
      value: a.id,
    })) || [];

  const handleAccountChange = (selectedOption: AccountOption | null) => {
    setSelectedAccount(selectedOption);
  };

  return (
    <div className="flex flex-col items-center h-full p-4">
      {accountOptions && accountOptions.length > 0 && (
        <Select
          className="basic-single"
          classNamePrefix="select accounts"
          value={selectedAccount}
          isDisabled={accountOptions.length <= 1}
          onChange={handleAccountChange}
          name="accounts"
          options={accountOptions}
        />
      )}

      <div className="flex items-center justify-start gap-4 w-full">
        <h2 className="text-white">Account : {selectedAccount?.label}</h2>
      </div>
      <div className="flex justify-between items-center gap-6 w-auto">
        <PerformanceWidget label="Total P&L" value="$5,378.53" />
        <PerformanceWidget label="% Profitable" value="0.61" />
        <PerformanceWidget label="Trade win %" value="0.73" />
      </div>
    </div>
  );
}
