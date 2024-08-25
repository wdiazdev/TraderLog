import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { signOut } from "../app/store/accountSlice"
import { useAppDispatch, useAppSelector } from "../app/store/configureStore"

export default function NavBar() {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.account)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="w-full bg-bkg-2 p-4 flex items-center justify-between">
      <Link to={"/"} className="text-[22px] text-accent-1">
        Project
      </Link>
      <div className="flex items-center gap-4 ">
        {user && (
          <Button onClick={handleClick}>
            <AccountCircleIcon className="text-accent-1" />
          </Button>
        )}

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              dispatch(signOut())
              handleClose()
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
