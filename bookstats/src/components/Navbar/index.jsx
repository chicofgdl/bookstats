import React, { useContext } from "react";
import AutocompleteSearch from "../AutocompleteSearch";
import { Switch, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "../../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

// Define temas claro e escuro
const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

// Customiza o switch para ter ícones de sol e lua minimalistas
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="#fff" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>`
                )}")`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#FFB300",
        width: 32,
        height: 32,
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="#fff" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>`
            )}")`,
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        borderRadius: 20 / 2,
    },
}));

export default function Navbar() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const currentLocation = useLocation(); // Renomeia para evitar conflito
    const navigate = useNavigate(); // Hook do React Router v6 para navegação

    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <nav
                className={`py-6 px-12 rounded-2xl ${
                    darkMode ? "bg-gray-700" : "bg-green-500"
                }`}
            >
                <div className="container mx-auto flex justify-between">
                    {currentLocation.pathname === "/" ? (
                        <AutocompleteSearch />
                    ) : (
                        <button
                            onClick={() => navigate("/")}
                            className={`text-white flex items-center gap-2 px-4 py-2 rounded ${
                                darkMode
                                    ? "bg-gray-700 hover:bg-gray-800/50"
                                    : "bg-green-500 hover:bg-green-600/50}"
                            }`}
                        >
                            <HomeIcon />
                            Página inicial
                        </button>
                    )}
                    <div className="flex flex-row justify-center items-center space-x-8">
                        {/* Switch customizado para modo noturno */}
                        <MaterialUISwitch
                            checked={darkMode}
                            onChange={toggleTheme}
                        />
                    </div>
                </div>
            </nav>
        </MuiThemeProvider>
    );
}
