import { LoadingButton } from "@mui/lab"
import { Box, Modal, TextField } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form"
import { TradeAccount } from "../../../model/tradeAccounts"
import { toast } from "react-toastify"
import {
  fetchTradeAccountsAsync,
  updateTradeAccountAsync,
} from "../../../app/store/tradeAccountsSlice"
import { useAppDispatch } from "../../../app/store/configureStore"
import Cancel from "@mui/icons-material/Cancel"

type Props = {
  selectedAccount: TradeAccount | null
  handleEditMode: () => void
  editMode: boolean
}

export default function UpdateAccountModal({ selectedAccount, handleEditMode, editMode }: Props) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
    values: {
      nickname: selectedAccount?.nickname ?? "",
    },
  })

  const submitForm = async (data: FieldValues) => {
    try {
      if (selectedAccount) {
        if (selectedAccount.nickname === data.nickname) {
          toast.error("It looks like the nickname you've chosen is already in use.")
          return
        }
        const result = await dispatch(
          updateTradeAccountAsync({
            id: selectedAccount.id,
            nickname: data.nickname,
          }),
        )
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Account successfully updated!")
          handleEditMode()
        }
        await dispatch(fetchTradeAccountsAsync())
      } else {
        console.log("Dispatch was not successful")
      }
    } catch (error) {
      console.log("error:", error)
    }
  }

  return (
    <Modal open={editMode} className="flex justify-center items-center p-20">
      <>
        {selectedAccount ? (
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            className="bg-container p-6 flex flex-col items-center rounded-xl w-[60%]"
          >
            <div className="flex items-center justify-between w-full">
              <h3>
                <span className="font-bold">Account:</span> {selectedAccount.name}
              </h3>
              <button type="button" onClick={() => handleEditMode()}>
                <Cancel />
              </button>
            </div>

            <TextField
              margin="normal"
              fullWidth
              label="Nickname"
              type="text"
              autoFocus
              {...register("nickname", { required: "Nickname is required" })}
              error={!!errors.nickname}
              helperText={errors?.nickname?.message as string}
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
        ) : null}
      </>
    </Modal>
  )
}
