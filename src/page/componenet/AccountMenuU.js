import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { deepPurple } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getStallAll } from "../m_booking/m_booking-service";
import { getmyWallet } from "../wallet-market copy/wallet-market-service";
import { getBookedStall } from "../bookinglist/bookinglist-service";
import { getSelectedMarket } from "../public_market_profile/public_marketprofile-service";
import { getMerchant } from "../u_profilesM/u_profileMservice";
export default function AccountMenu(props) {
  const { img, name, signOut, role, uid, refid } = props;
  const navigate = useNavigate();
  const marketId = uid;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendApi = async () => {
    const payload = {};
    const marketId = uid;
    const res = await getSelectedMarket(payload, marketId);
    navigate("/MProfile", {
      state: res,
    });
    console.log(res);
  };

  const sendApiC = async () => {
    const res = await getStallAll(marketId);
    navigate("/MControl", {
      state: res,
    });
    console.log(uid);
  };
  const sendApiMC = async () => {
    const res = await getMerchant(refid);
    navigate("/ProfileView", {
      state: res,
      uid: res._id,
    });
  };

  const sendApiW = async () => {
    const res = await getmyWallet();
    navigate("/walletpage", { state: res });
    console.log(res);
  };

  const sendApiBL = async () => {
    const res = await getBookedStall();
    navigate("/mybookinglist", { state: res });
    console.log(res);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {role !== "Market" ? (
              <Avatar sx={{ width: 32, height: 32, bgcolor: deepPurple[500] }}>
                <img
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  src={`data:image/jpeg;base64,${img}`}
                />
              </Avatar>
            ) : (
              <MenuIcon sx={{ width: 32, height: 32 }}></MenuIcon>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {role !== "Market" ? (
          <>
            <MenuItem onClick={sendApiMC}>โปรไฟล์ของฉัน</MenuItem>
            <MenuItem onClick={sendApiBL}>ตลาดที่จองไว้</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={sendApi}>ตลาดของฉัน</MenuItem>
            <MenuItem onClick={sendApiC}>จัดการตลาด</MenuItem>
            <MenuItem onClick={sendApiW}>กระเป๋าตังของฉัน</MenuItem>
          </>
        )}

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          ตั้งค่า
        </MenuItem>
        <MenuItem onClick={signOut}>
          <NavLink to="login">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            ออกจากระบบ
          </NavLink>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
