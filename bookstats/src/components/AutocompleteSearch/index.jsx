import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchContext } from "../../context/SearchContext";

export default function AutocompleteSearch() {
    const [suggestions, setSuggestions] = useState([]);
    const { setSearchTerm } = useContext(SearchContext);

    // Função para buscar sugestões na Google Books API
    const fetchSuggestions = async (query) => {
        if (query) {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
                );
                
                const authorNames = new Set(); // Conjunto para armazenar autores únicos
                const suggestionsData = response.data.items.map((item) => {
                    const title = item.volumeInfo.title;
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Autor desconhecido";
                    if (item.volumeInfo.authors) {
                        item.volumeInfo.authors.forEach((author) => authorNames.add(author));
                    }
                    return { title, authors };
                });

                // Cria uma lista de sugestões com o autor no topo
                const authorSuggestions = Array.from(authorNames).map((author) => ({ title: author, authors: "Autor" }));
                setSuggestions([...authorSuggestions, ...suggestionsData]);

            } catch (error) {
                console.error("Erro ao buscar sugestões:", error);
            }
        }
    };

    const handleInputChange = (event, value) => {
        fetchSuggestions(value);
    };

    const handleSelection = (event, value) => {
        if (value) {
            setSearchTerm(value.authors === "Autor" ? value.title : value.title); // Se for "Autor", busca todos os livros dele
        }
    };

    return (
        <Autocomplete
            disablePortal
            options={suggestions}
            getOptionLabel={(option) => `${option.title}${option.authors !== "Autor" ? ` - ${option.authors}` : ""}`}
            onInputChange={handleInputChange}
            onChange={handleSelection}
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
