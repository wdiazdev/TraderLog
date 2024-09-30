import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TradeAccount } from "../../../model/tradeAccounts";
import formatToCurrency from "../../../helper/formatToCurrency";
import { toast } from "react-toastify";
import {
  fetchTradeAccountsAsync,
  updateTradeAccountAsync,
} from "../../../app/store/tradeAccountsSlice";
import { useAppDispatch } from "../../../app/store/configureStore";

type Props = {
  selectedAccount: TradeAccount | null;
  handleEditMode: () => void;
};

export default function UpdateAccount({
  selectedAccount,
  handleEditMode,
}: Props) {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
    // values: {
    //   nickname: selectedAccount?.nickname ?? "",
    // },
  });

  const submitForm = async () => {
    try {
      if (selectedAccount) {
        const result = await dispatch(
          updateTradeAccountAsync({
            id: selectedAccount.id,
            nickname: selectedAccount.nickname,
          })
        );
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Account successfully updated!");
        }
        await dispatch(fetchTradeAccountsAsync());
      } else {
        console.log("Dispatch was not successful");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      {selectedAccount ? (
        <div className="bg-container pt-12 pb-12 flex flex-col items-center p-4 rounded-xl">
          <div className="flex items-center justify-between w-full">
            <h3>{selectedAccount.name}</h3>
            <p>{formatToCurrency(selectedAccount.balance)}</p>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            className="w-full flex flex-col gap-2 mt-6"
          >
            <TextField
              margin="normal"
              fullWidth
              label="Nickname"
              type="text"
              autoFocus
              {...register("nickname", { required: "Nickname is required" })}
              error={!!errors.nickname}
              helperText={errors?.nickname?.message as string}
              // onChange={(e) => setValue("nickname", e.target.value)}
            />

            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "rgb(39,194,232)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgb(71,204,237)",
                },
              }}
            >
              Update
            </LoadingButton>
          </Box>
        </div>
      ) : null}
    </>
  );
}
