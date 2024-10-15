import { useAppSelector } from "../../../app/store/configureStore"
import ScreenLoader from "../../../components/ScreenLoader"
import AccountsTable from "./AccountsTable"
import { useState } from "react"
import { TradeAccount } from "../../../model/tradeAccounts"
import UpdateAccountModal from "./UpdateAccountModal"
import Add from "@mui/icons-material/Add"
import CreateAccountModal from "./CreateAccountModal"

export default function ManageAccounts() {
  const { status, accounts } = useAppSelector((state) => state.tradeAccounts)

  const [selectedAccount, setSelectedAccount] = useState<TradeAccount | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false)

  const handleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleCreateAccount = () => {
    setIsCreateAccountOpen(!isCreateAccountOpen)
  }

  const handleEditAccount = (account: TradeAccount | null) => {
    setSelectedAccount(account)
    handleEditMode()
  }

  return (
    <>
      {status === "pendingFetchTradeAccounts" ? (
        <ScreenLoader size={28} />
      ) : accounts && accounts.length > 0 ? (
        <>
          <button
            className="flex items-center gap-2 mb-4"
            onClick={() => setIsCreateAccountOpen(!isCreateAccountOpen)}
          >
            <h3 className="text-white text-[20px]">Add Account</h3>
            <Add className="text-accent-2" />
          </button>

          <AccountsTable
            accounts={accounts}
            status={status}
            handleEditAccount={handleEditAccount}
          />

          <UpdateAccountModal
            selectedAccount={selectedAccount}
            editMode={editMode}
            handleEditMode={handleEditMode}
          />

          <CreateAccountModal
            isCreateAccountOpen={isCreateAccountOpen}
            handleCreateAccount={handleCreateAccount}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-full p-4">
          <p className="text-white">
            Oops! No accounts found linked to your profile. Please create a new account.
          </p>
        </div>
      )}
    </>
  )
}
