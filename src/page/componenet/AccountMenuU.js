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

export default function AccountMenu(props) {
  const { name, signOut, role } = props;
  const navigate = useNavigate();
  console.log(role);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  console.log("This is" + role + name);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendApi = () => {
    navigate("/MProfile");
  };

  const sendApiC = () => {
    navigate("/MControl");
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
            <Avatar sx={{ width: 32, height: 32, bgcolor: deepPurple[500] }}>
              {name}
            </Avatar>
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
            <MenuItem onClick={handleClose}>โปรไฟล์ของฉัน</MenuItem>
            <MenuItem onClick={handleClose}>ตลาดที่จองไว้</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={sendApi}>ตลาดของฉัน</MenuItem>
            <MenuItem onClick={sendApiC}>จัดการตลาด</MenuItem>
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
