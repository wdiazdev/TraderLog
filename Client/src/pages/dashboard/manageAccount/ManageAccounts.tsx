import { useAppSelector } from "../../../app/store/configureStore";
import ScreenLoader from "../../../components/ScreenLoader";
import UpdateAccount from "./UpdateAccount";
import AccountsTable from "./AccountsTable";
import { useState } from "react";
import { TradeAccount } from "../../../model/tradeAccounts";

export default function ManageAccounts() {
  const { status, accounts } = useAppSelector((state) => state.tradeAccounts);

  const [selectedAccount, setSelectedAccount] = useState<TradeAccount | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = (account: TradeAccount | null) => {
    setSelectedAccount(account);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {status === "pendingFetchTradeAccounts" ? (
        <ScreenLoader size={28} />
      ) : accounts && accounts.length > 0 ? (
        <div className="flex flex-col gap-4">
          <AccountsTable
            accounts={accounts}
            status={status}
            onEdit={handleEditClick}
          />
          <UpdateAccount
            handleEditMode={handleEditMode}
            selectedAccount={selectedAccount}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full p-4">
          <p className="text-white">
            Oops! No accounts found linked to your profile. Please create a new
            account.
          </p>
        </div>
      )}
    </>
  );
}
