import Cancel from "@mui/icons-material/Cancel"
import { DatePicker, LoadingButton } from "@mui/lab"

import { Box, Modal, TextField } from "@mui/material"
import dayjs from "dayjs"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useAppDispatch } from "../../../app/store/configureStore"
import {
  createTradeAccountAsync,
  fetchTradeAccountsAsync,
} from "../../../app/store/tradeAccountsSlice"
import { toast } from "react-toastify"

type Props = {
  isCreateAccountOpen: boolean
  handleCreateAccount: () => void
}

export default function CreateAccountModal({ isCreateAccountOpen, handleCreateAccount }: Props) {
  const dispatch = useAppDispatch()

  //   const [datePickerValue, setDatePickerValue] = useState(dayjs().format("YYYY-MM-DDTHH:mm:ss"))

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
  })

  const submitForm = async (data: FieldValues) => {
    try {
      const result = await dispatch(
        createTradeAccountAsync({
          nickname: data.nickname,
        }),
      )
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Account successfully created!")
        handleCreateAccount()
      }
      await dispatch(fetchTradeAccountsAsync())
    } catch (error) {
      console.log("error:", error)
    }
  }

  return (
    <Modal open={isCreateAccountOpen} className="flex justify-center items-center p-20">
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        className="bg-container p-6 flex flex-col items-center rounded-xl w-[60%]"
      >
        <button type="button" onClick={() => handleCreateAccount()}>
          <Cancel />
        </button>

        <TextField
          margin="normal"
          fullWidth
          label="Nickname"
          type="text"
          autoFocus
          {...register("nickname")}
        />

        {/* <TextField
          margin="normal"
          fullWidth
          label="Initial Balance"
          type="number"
          {...register("initialBalance")}
        /> */}

        <LoadingButton
          loading={isSubmitting}
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
          Create
        </LoadingButton>
      </Box>
    </Modal>
  )
}
