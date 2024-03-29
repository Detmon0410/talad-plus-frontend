import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountMenu from "./AccountMenuU";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

export default function CustomeAppBar(props) {
  const { img, name, role, signIn, signOut, uid, refid } = props;
  console.log("awww" + name + "nooo" + uid);
  const navigate = useNavigate();
  const sendApi = () => {
    navigate("/home");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#ffc422" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon onClick={sendApi} />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            ></Typography>
          </div>

          <div sx={{ display: "flex", alignItems: "center" }}>
            <div sx={{ display: { xs: "none", sm: "block" } }}>
              <AccountMenu
                img={img}
                name={name}
                signOut={signOut}
                role={role}
                uid={uid}
                refid={refid}
                alt="Josh Brush"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: 30,
                  height: 30,
                  mr: 2,
                  ml: 2,
                }}
              ></AccountMenu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
