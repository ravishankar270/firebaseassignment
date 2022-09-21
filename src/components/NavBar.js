// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import {Link} from 'react-router-dom'
// function NavBar({auth,signout}) {
//   return (
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const settings = ["Login", "Logout"];

const ResponsiveAppBar = ({ user, auth, signout }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selected, setSelected] = React.useState(-1);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  const selectedButton=(num)=>{
    setSelected(num)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blogs
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key={0} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ color:selected==1?'blue': "white", textDecoration: "none" }}
                      to="/myblogs"
                      onClick={()=>selectedButton(1)}
                    >
                      My Blogs
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key={1} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ color: selected==2?'blue': "white", textDecoration: "none" }}
                      to="/"
                      onClick={()=>selectedButton(2)}
                    >
                      Blogs
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{color:selected==3?'blue': "white", textDecoration: "none" }}
                      to="/createBlog"
                      onClick={()=>selectedButton(3)}
                    >
                      Create Blogs
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blogs
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link style={{  textDecoration: "none" }} onClick={()=>selectedButton(1)} to="/myblogs">
                <Button
                  key={0}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: selected==1?'blue': "white", display: "block" }}
                >
                  My Blogs
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} onClick={()=>selectedButton(2)} to="/">
                <Button
                  key={1}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: selected==2?'blue': "white", display: "block" }}
                  
                >
                  Blogs
                </Button>
              </Link>
              <Link
                style={{textDecoration: "none" }}
                to="/createBlog"
                onClick={()=>selectedButton(3)}
              >
              <Button
                key={2}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: selected==3?'blue': "white", display: "block" }}
              >
                  Create Blogs
              </Button>
                </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? (
                    <div
                      style={{
                        backgroundColor: "gray",
                        borderRadius: "50%",
                        width: "35px",
                      }}
                    >
                      {user[0]}
                    </div>
                  ) : (
                    <span
                      style={{
                        borderRadius: "0%",
                        textAlign:'center',
                        width: "100px",
                      }}
                    >
                      Login
                    </span>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {" "}
                {!auth ? (
                  <MenuItem key="login" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to="/login"
                      >
                        Login
                      </Link>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        onClick={signout}
                      >
                        Logout
                      </Link>
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;

//   );
// }

// export default NavBar;
