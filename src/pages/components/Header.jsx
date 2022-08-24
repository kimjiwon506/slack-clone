import {
  AppBar,
  Toolbar,
  // TagIcon,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
// import { userSelector } from "react-redux";

const Header = () => {
  const [anchorEl, setAncorEl] = useState(null);
  const handleOpenMenu = (event) => {
    setAncorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAncorEl(null);

  // const { user } = userSelector((state) => state);
  return (
    <>
      {/* TODO backgroundColor 테마적용 */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#9a93b",
          backgroundColor: "#4c3c4c",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {/* <TagIcon></TagIcon> */}
            <Typography variant="h6" component="div">
              SLACK
            </Typography>
          </Box>
          <Box onClick={handleOpenMenu}>
            <IconButton>
              <Typography variant="h6" component="div">
                {/* {user?.currentUser?.displayName} */}
              </Typography>
              <Avatar
                sx={{ ml: "10px" }}
                alt="profileImage"
                // src={user.currentUser?.photoURL}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorEl}
              // open={Boolean(anchorElUser)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem>
                <Typography textAlign={"center"}>프로필이미지</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign={"center"}>LOGOUT</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
