import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";
import LineChart from "../../components/Charts/LineChart";
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    TextField,
    Button,
} from "@mui/material";
import dayjs from "dayjs"; // Biblioteca para manipulação de datas

const barData = [
    { genre: "Romance", value: 55 },
    { genre: "Programação", value: 15 },
    { genre: "Teror", value: 25 },
    { genre: "Aventura", value: 20 },
];

const pieData = [
    { id: "Romance", label: "A", value: 55 },
    { id: "Programação", label: "A", value: 15 },
    { id: "Teror", label: "B", value: 25 },
    { id: "Aventura", label: "C", value: 20 },
];

// const lineData = [
//     {
//         id: "Romance",
//         data: [
//             { x: "2020", y: 350 },
//             { x: "2021", y: 100 },
//             { x: "2022", y: 150 },
//             { x: "2023", y: 200 },
//         ],
//     },
//     {
//         id: "Terror",
//         data: [
//             { x: "2020", y: 150 },
//             { x: "2021", y: 200 },
//             { x: "2022", y: 250 },
//             { x: "2023", y: 300 },
//         ],
//     },
//     {
//         id: "Aventura",
//         data: [
//             { x: "2020", y: 250 },
//             { x: "2021", y: 250 },
//             { x: "2022", y: 150 },
//             { x: "2023", y: 100 },
//         ],
//     },
// ];

export default function Dashboard() {
    const [chartType, setChartType] = useState("bar"); // Estado para controlar o tipo de gráfico da análise de Distribuições por gênero
    const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados pelo usuário
    const [startDate, setStartDate] = useState(""); // Data de início para o gráfico
    const [endDate, setEndDate] = useState(""); // Data de fim para o gráfico
    const [lineData, setLineData] = useState([]); // Dados do gráfico de linha

    const availableGenres = [
        "Action and Adventure",
        "Arts",
        "Biographies",
        "Business",
        "Children's",
        "Classics",
        "Comics",
        "Cookbooks",
        "Dictionaries",
        "Education",
        "Fiction",
        "Health",
        "History",
        "Hobbies",
        "Humor",
        "Literature",
        "Medical",
        "Music",
        "Mystery",
        "Nonfiction",
        "Philosophy",
        "Poetry",
        "Reference",
        "Religion",
        "Romance",
        "Science",
        "Self Help",
        "Social Science",
        "Sports",
        "Technology",
        "Travel",
        "Young Adult",
    ];
    // Romance e Ficção Científica
    // Suspense e Mistério
    // Não Ficção Histórica
    // Poesia e Romance
    // Romance e Mistério
    // Fantasia e Aventura
    // Narrativa histórica

    // Função para atualizar o tipo de gráfico
    const handleChange = (event) => {
        setChartType(event.target.value);
    };

    const handleDateChange = (event, type) => {
        if (type === "start") setStartDate(event.target.value);
        else setEndDate(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenres(event.target.value);
    };

    const fetchLineData = async () => {
        if (startDate > endDate) {
            console.log("Data de início maior que a data de fim");
        }
        if (
            !startDate ||
            !endDate ||
            startDate > endDate ||
            selectedGenres.length === 0
        )
            return;

        try {
            const fetchGenreData = async (genre) => {
                const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=0&maxResults=40&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;

                const response = await fetch(url);
                const data = await response.json();

                const monthlyAverages = {};

                data.items.forEach((item) => {
                    const { publishedDate, averageRating } = item.volumeInfo;
                    if (publishedDate && averageRating) {
                        const date = dayjs(publishedDate).format("MM-YYYY");
                        if (!monthlyAverages[date]) {
                            monthlyAverages[date] = { total: 0, count: 0 };
                        }
                        monthlyAverages[date].total += averageRating;
                        monthlyAverages[date].count += 1;
                    }
                });

                // Organizando os dados para o gráfico
                const genreData = {
                    id: genre,
                    data: Object.keys(monthlyAverages)
                        .sort()
                        .map((date) => ({
                            x: date,
                            y:
                                monthlyAverages[date].count > 0
                                    ? (
                                          monthlyAverages[date].total /
                                          monthlyAverages[date].count
                                      ).toFixed(2)
                                    : 0,
                        })),
                };

                return genreData;
            };

            const allGenresData = await Promise.all(
                selectedGenres.map(async (genre) => {
                    const genreData = await fetchGenreData(genre);
                    return genreData;
                })
            );

            setLineData(allGenresData);
        } catch (error) {
            console.error(
                "Erro ao buscar dados para o gráfico de linha:",
                error
            );
        }
    };

    return (
        <div className="p-4 bg-gray-200 flex flex-row gap-6 w-full h-full">
            <Sidebar />
            <div className="flex flex-col w-full gap-4">
                <Navbar />

                <div className="flex flex-col items-start justify-start p-8 bg-gray-50 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-8 self-center">
                        Distribuições por gênero
                    </h1>

                    {/* Seletor de gráfico */}
                    <FormControl sx={{ mb: 4 }}>
                        <InputLabel>Escolha o Gráfico</InputLabel>
                        <Select
                            value={chartType}
                            label="Escolha o Gráfico"
                            onChange={handleChange}
                            sx={{
                                backgroundColor: "white",
                                borderRadius: 1,
                                borderColor: "green",
                                boxShadow: 1,
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "green",
                                    },
                                },
                            }}
                        >
                            <MenuItem value="bar">Gráfico de Barras</MenuItem>
                            <MenuItem value="pie">Gráfico de Pizza</MenuItem>
                        </Select>
                    </FormControl>

                    <Box
                        sx={{
                            width: "100%",
                            height: 400,
                            position: "relative",
                        }}
                    >
                        {chartType === "bar" && <BarChart data={barData} />}
                        {chartType === "pie" && <PieChart data={pieData} />}
                    </Box>
                </div>
                {/* Gráfico de linha */}
                <div className="flex flex-col items-start justify-start p-8 bg-gray-50 rounded-2xl shadow-lg mt-8">
                    <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-8 self-center">
                        Gráfico de Linha
                    </h1>
                    {/* Filtros de Data e Gênero */}
                    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                        <TextField
                            label="Data Início"
                            type="month"
                            value={startDate}
                            onChange={(event) =>
                                handleDateChange(event, "start")
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Data Fim"
                            type="month"
                            value={endDate}
                            onChange={(event) => handleDateChange(event, "end")}
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Selecione Gêneros</InputLabel>
                            <Select
                                multiple
                                value={selectedGenres}
                                onChange={handleGenreChange}
                                renderValue={(selected) => selected.join(", ")}
                            >
                                {availableGenres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                        {genre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={fetchLineData}>
                            Atualizar Gráfico
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            height: 400,
                            position: "relative",
                        }}
                    >
                        {lineData.length > 0 ? (
                            <LineChart data={lineData} />
                        ) : (
                            <div className="text-2xl">
                                Selecione datas e gênero para visualizar o
                                gráfico.
                            </div>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    );
}
