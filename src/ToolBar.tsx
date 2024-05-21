import {
  AppBar,
  Box,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

type Props = {
  filter: Filter;
};

export const ToolBar = (props: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="menu-button"
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography>{props.filter}</Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
