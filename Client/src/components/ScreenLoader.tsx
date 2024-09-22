import { CircularProgress, Typography } from "@mui/material";

interface Props {
  size?: number;
  message?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function ScreenLoader({
  size = 40,
  message = "Loading...",
  variant = "h6",
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-bkg-1">
      <CircularProgress color="secondary" size={size} />
      <Typography variant={variant} sx={{ color: "white", mt: 2 }}>
        {message}
      </Typography>
    </div>
  );
}
