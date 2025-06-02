import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  InputBase,
  Box,
  Slide,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ProfileAvatar from "../avatar/ProfileAvatar";
import { Icon } from "@iconify/react";
import NavLogo from "../logo/NavLogo";
import NotificationMenu from "../notifications/NotificationMenu";



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
  },
  width: "100%",
  maxWidth: 400,
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
  width: "100%",
  padding: theme.spacing(1, 1, 1, 4),
}));


export default function Navbar({ onDrawerToggle  }) {
  const isMobile = useMediaQuery('(max-width:800px)');
  const theme = useTheme();
  const { t } = useTranslation();
  const [showNavbar, setShowNavbar] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);  
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (

    <Slide appear={false} direction="down" in={showNavbar}>
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease-in-out",
        px: 2,
      }}
      showNavbar={showNavbar}
    >
      <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
      
      {isMobile && (
          <IconButton onClick={onDrawerToggle}
           sx={{ display: { xs: "block", md: "none" }, ml: 1 }}>
             <Icon icon='ri:menu-fold-4-line' width='26' height='26' />
          </IconButton>
        )}
        
        <Typography variant="h6" fontWeight={700}>
          {t.Home}
        </Typography>
        {/* {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", px: 2 }}>
            <Search>
              <SearchIconWrapper>
                <Icon icon="ri:search-line" width="20" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search>
          </Box>
        )} */}
        <Stack direction="row" spacing={2}>
          <NotificationMenu />
          <ProfileAvatar />
        </Stack>
      </Toolbar>
    </AppBar>
    </Slide>
  );
};


