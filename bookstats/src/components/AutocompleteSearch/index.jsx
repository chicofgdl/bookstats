import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function AutocompleteSearch() {
    const books = ["Kafka", "Dostoievski", "Nietzsche"];

    return (
        <Autocomplete
            disablePortal
            options={books}
            sx={{
                width: 400,
                "& .MuiOutlinedInput-root": {
                    color: "white",
                    backgroundColor: "transparent",
                    "& fieldset": {
                        border: "none",
                    },
                },
                "& .MuiAutocomplete-popupIndicator": {
                    display: 'none',
                },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Buscar por nome do livro ou autor"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: "white" }} />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}
