import { Box, TextField, Stack, Button } from "@mui/material";
import { Link, useLocation } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

function Header() {
  const { pathname } = useLocation();

  const sx1 = {
    alignItems: "center",
    justifyContent: pathname == "/login" ? "center" : "space-between",
    padding: "10px 20px",
    backgroundColor: "#121212",
    color: "white",
    gap: 2,
    height: 50,
  };
  const sx2 = {
    "& a": {
      color: "#fff",
      fontSize: 32,
    },
  };
  const sx3 = {
    display: "flex",
    flexGrow: 0.3,
    alignItems: "center",
  };
  const sx4 = {
    "& .MuiInputBase-input": {
      padding: "5px",
      backgroundColor: "#fff",
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&:focused fieldset": {
        border: "none",
      },
    },
  };
  const sx5 = {
    backgroundColor: "#febd69",
    color: "black",
    fontSize: 33,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingLeft: "3px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F3A847",
    },
  };
  const sx6 = {
    "& a": {
      textDecoration: "none",
      color: "#fff",
    },
  };
  const sx7 = {
    color: "#FFF",
    "&:hover": {
      color: "#F3A847",
    },
  };
  const sx8 = {
    textTransform: "none",
    "&:hover": {
      color: "#F3A847",
    },
    padding: 0,
  };

  return (
    <Stack component="header" direction="row" sx={sx1}>
      <Box sx={sx2}>
        <Link to="/">Amazon</Link>
      </Box>
      {pathname == "/login" ? null : (
        <>
          <Box sx={sx3}>
            <TextField fullWidth sx={sx4} />

            <SearchIcon sx={sx5} />
          </Box>

          <Stack direction="row" sx={sx6}>
            <IconButton sx={sx7}>
              <ShoppingCartIcon fontSize="medium" />
              <span className="cart-count">5</span>
            </IconButton>

            <Button component={Link} to="login" disableRipple sx={sx8}>
              Sign in
            </Button>

            <Button component={Link} to="#" disableRipple sx={sx8}>
              Sign up
            </Button>

            <Button component={Link} to="#" disableRipple sx={sx8}>
              Profile
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default Header;
