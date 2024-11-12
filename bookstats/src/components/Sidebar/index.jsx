import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Home, Book, Dashboard, Info  } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box  } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

export default function Sidebar() {
    const { darkMode } = useContext(ThemeContext);
    return (
        <Box
            className={`${ darkMode ? "bg-gray-700" : "bg-green-500"} rounded-2xl p-6`}
            sx={{
                width: 320,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingBottom: 10,
            }}
        >
            {/* Título */}
            <Typography variant="h4" color="white" fontWeight="bold" align="center">
                BookStats
            </Typography>
            {/* Links */}
            <List>
                <ListItem component={Link} to="/" button>
                    <ListItemIcon>
                        <Home style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>

                <ListItem component={Link} to="/bookshelves" button>
                    <ListItemIcon>
                        <Book style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Estantes" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>

                <ListItem component={Link} to="/dashboard" button>
                    <ListItemIcon>
                        <Dashboard style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>

            </List>

            {/* "BookBridge" no final */}
            <ListItem button>
                <ListItemIcon>
                    <Info style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="BookBridge" primaryTypographyProps={{ style: { color: "white" } }} />
            </ListItem>            
        </Box>
    );
}
