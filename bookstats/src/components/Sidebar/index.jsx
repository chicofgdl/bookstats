import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Book, Dashboard, Settings, Info  } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box  } from "@mui/material";

export default function Sidebar() {

    return (
        <Box
            className="bg-green-500 rounded-2xl p-6"
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

                <ListItem component={Link} to="/pesquisa" button>
                    <ListItemIcon>
                        <Search style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Pesquisa" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>

                <ListItem component={Link} to="/livros" button>
                    <ListItemIcon>
                        <Book style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Livros" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>

                <ListItem component={Link} to="/dashboard" button>
                    <ListItemIcon>
                        <Dashboard style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>

                <ListItem component={Link} to="/settings" button>
                    <ListItemIcon>
                        <Settings style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" primaryTypographyProps={{ style: { color: "white" } }} />
                </ListItem>
            </List>

            {/* "About" no final */}
            <ListItem button>
                <ListItemIcon>
                    <Info style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="About" primaryTypographyProps={{ style: { color: "white" } }} />
            </ListItem>            
        </Box>
    );
}
