import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ScreenLoader from "../../components/ScreenLoader";
import formatToCurrency from "../../helper/formatToCurrency";
import formatDate from "../../helper/formatDate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import {
  deleteTradeAccountAsync,
  fetchTradeAccountsAsync,
} from "../../app/store/tradeAccountsSlice";
import { TradeAccount } from "../../model/tradeAccounts";

export default function ManageAccounts() {
  const { status, accounts } = useAppSelector((state) => state.tradeAccounts);
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async (account: TradeAccount) => {
    await dispatch(deleteTradeAccountAsync({ accountId: account.id }));
    await dispatch(fetchTradeAccountsAsync());
  };

  return (
    <>
      {status === "pendingFetchTradeAccounts" ? (
        <ScreenLoader size={28} />
      ) : accounts && accounts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-bkg-2">
              <TableRow>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
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
                <TableRow
                  key={account.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {account.name}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(account.createdDate)}
                  </TableCell>
                  <TableCell align="center">
                    {formatToCurrency(account.balance)}
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon />
                  </TableCell>
                  <TableCell align="center">
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
                      loading={
                        status === "pendingDeleteTradeAccount" + account.id
                      }
                    >
                      <DeleteIcon />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
