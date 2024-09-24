import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import PerformanceWidget from "../../components/PerformanceWidget";
import ScreenLoader from "../../components/ScreenLoader";
import Select from "react-select";
import formatToCurrency from "../../helper/formatToCurrency";

type AccountOption = {
  label: string;
  value: number;
};

export default function Performance() {
  const { status, accounts } = useAppSelector((state) => state.tradeAccounts);
  console.log("accounts:", accounts);

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

  const accountOptions =
    accounts?.map((a) => ({
      label: a.name,
      value: a.id,
    })) || [];

  const handleAccountChange = (selectedOption: AccountOption | null) => {
    setSelectedAccount(selectedOption);
  };

  const renderSelectedAccount = accounts?.find(
    (account) => account.id === selectedAccount?.value
  );

  return (
    <>
      {status === "pendingFetchTradeAccounts" ? (
        <ScreenLoader size={28} />
      ) : accountOptions.length > 0 ? (
        <div className="flex flex-col items-center h-full p-4">
          <Select
            className="basic-single"
            classNamePrefix="select accounts"
            value={selectedAccount}
            isDisabled={accountOptions.length <= 1}
            onChange={handleAccountChange}
            name="accounts"
            options={accountOptions}
          />

          {renderSelectedAccount && (
            <>
              <div className="flex items-center justify-start gap-4 w-full">
                <h2 className="text-white">
                  Account : {renderSelectedAccount.name}
                </h2>
              </div>
              <div className="flex justify-between items-center gap-6 w-auto">
                <PerformanceWidget
                  label="Balance"
                  value={formatToCurrency(renderSelectedAccount.balance)}
                />
                <PerformanceWidget label="% Profitable" value="0.61" />
                <PerformanceWidget label="Trade win %" value="0.73" />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full p-4">
          <p className="text-white">
            No Accounts Found. Please create a new account.
          </p>
        </div>
      )}
    </>
  );
}
