import { LoadingButton } from "@mui/lab"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"
import formatDate from "../../../helper/formatDate"
import formatToCurrency from "../../../helper/formatToCurrency"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useAppDispatch } from "../../../app/store/configureStore"
import {
  deleteTradeAccountAsync,
  fetchTradeAccountsAsync,
} from "../../../app/store/tradeAccountsSlice"
import { TradeAccount } from "../../../model/tradeAccounts"
import truncateString from "../../../helper/truncateString"

type Props = {
  accounts: TradeAccount[]
  status: string
  handleEditAccount: (account: TradeAccount) => void
}

export default function AccountsTable({ accounts, status, handleEditAccount }: Props) {
  const dispatch = useAppDispatch()

  const handleDeleteAccount = async (account: TradeAccount) => {
    await dispatch(deleteTradeAccountAsync({ accountId: account.id }))
    await dispatch(fetchTradeAccountsAsync())
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-bkg-2">
          <TableRow>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Nickname
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Created Date
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Balance
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}></TableCell>
            <TableCell align="center" sx={{ color: "white" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell className="bg-container">{account.name}</TableCell>
              <TableCell align="center" className="bg-container">
                {truncateString(account.nickname, 20)}
              </TableCell>
              <TableCell align="center" className="bg-container">
                {formatDate(account.createdDate)}
              </TableCell>
              <TableCell align="center" className="bg-container">
                {formatToCurrency(account.balance)}
              </TableCell>
              <TableCell align="center" className="bg-container">
                <button type="button" onClick={() => handleEditAccount(account)}>
                  <EditIcon />
                </button>
              </TableCell>
              <TableCell align="center" className="bg-container">
                <LoadingButton
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(42 41 47)",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                  onClick={() => handleDeleteAccount(account)}
                  loading={status === "pendingDeleteTradeAccount" + account.id}
                >
                  <DeleteIcon />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
