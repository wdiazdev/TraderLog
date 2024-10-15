import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AppButton from "../../components/AppButton"

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box className="flex flex-col justify-center items-center min-h-screen bg-bkg-1 p-4">
      <Typography variant="h4" className="text-[white] text-center">
        Opps - we couldn't find what you are looking for
      </Typography>
      <AppButton title=" Go back!" onClick={() => navigate("/")} />
    </Box>
  )
}
