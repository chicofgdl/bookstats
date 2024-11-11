import React, { useState } from "react";
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



// Defina o intervalo de anos que você quer mostrar (exemplo de 1900 a 2100)
// const yearRange = Array.from({ length: 2101 - 1900 }, (_, index) => 1900 + index);

export default function Dashboard() {
    const [chartType, setChartType] = useState("bar"); // Estado para controlar o tipo de gráfico da análise de Distribuições por gênero
    const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados pelo usuário
    const [startDate, setStartDate] = useState(""); // Data de início para o gráfico
    const [endDate, setEndDate] = useState(""); // Data de fim para o gráfico
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [lineData, setLineData] = useState([]); // Dados do gráfico de linha

    const availableGenres = [
        "Arts",
        "Biographies",
        "Business",
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
        "Religion",
        "Romance",
        "Science",
        "Sports",
        "Technology",
        "Travel",
    ];

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

    const fetchChartData = async () => {
        if (selectedGenres.length === 0) return;

        try {
            const fetchGenreRatingData = async (genre) => {
                const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=0&maxResults=40&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();

                let totalRating = 0;
                let ratingCount = 0;

                data.items.forEach((item) => {
                    const { averageRating } = item.volumeInfo;
                    if (averageRating) {
                        totalRating += averageRating;
                        ratingCount += 1;
                    }
                });

                const avgRating = ratingCount ? totalRating / ratingCount : 0;
                return { genre, value: avgRating };
            };

            const chartData = await Promise.all(selectedGenres.map(fetchGenreRatingData));
            setBarChartData(chartData);
            setPieChartData(chartData.map((data) => ({ id: data.genre, label: data.genre, value: data.value })));

        } catch (error) {
            console.error("Erro ao buscar dados para o gráfico:", error);
        }
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

                const yearlyAverages = {};

                data.items.forEach((item) => {
                    const { publishedDate, averageRating } = item.volumeInfo;

                    if (publishedDate && averageRating) {
                        const year = dayjs(publishedDate).year();

                        // Verificação se o ano está dentro do intervalo desejado
                        if (
                            year >= parseInt(startDate) &&
                            year <= parseInt(endDate)
                        ) {
                            if (!yearlyAverages[year]) {
                                yearlyAverages[year] = { total: 0, count: 0 };
                            }
                            yearlyAverages[year].total += averageRating;
                            yearlyAverages[year].count += 1;
                        }
                    }
                });

                // Organizando os dados para o gráfico
                const genreData = {
                    id: genre,
                    data: Object.keys(yearlyAverages)
                        .sort((a, b) => parseInt(a) - parseInt(b))
                        .map((year) => ({
                            x: year,
                            y: (
                                yearlyAverages[year].total /
                                yearlyAverages[year].count
                            ).toFixed(2),
                        })),
                };

                return genreData;
            };

            // Obter os dados para todos os gêneros
            const allGenresData = await Promise.all(
                selectedGenres.map(async (genre) => {
                    const genreData = await fetchGenreData(genre);
                    return genreData;
                })
            );

            // Obter todos os anos no intervalo (em formato de Set para evitar duplicação)
            const allYears = new Set();
            allGenresData.forEach((genreData) => {
                genreData.data.forEach((point) => {
                    allYears.add(point.x); // Adiciona os anos de cada gênero
                });
            });

            // Criar dados unificados para cada gênero, incluindo anos sem dados
            const unifiedData = allGenresData.map((genreData) => {
                const unifiedGenreData = [];

                // Para cada ano no intervalo de anos, verifica se o gênero tem dados para esse ano
                Array.from(allYears)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .forEach((year) => {
                        const dataPoint = genreData.data.find(
                            (point) => point.x === year
                        );

                        unifiedGenreData.push({
                            x: year,
                            y: dataPoint ? dataPoint.y : 0,
                        });
                    });

                return {
                    ...genreData,
                    data: unifiedGenreData,
                };
            });

            setLineData(unifiedData);
            console.log(unifiedData);
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
                    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
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
                    <FormControl sx={{ minWidth: 200, mb: 4 }}>
                        <InputLabel>Selecione Gêneros</InputLabel>
                        <Select multiple value={selectedGenres} onChange={handleGenreChange} renderValue={(selected) => selected.join(", ")}>
                            {availableGenres.map((genre) => (
                                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={fetchChartData} sx={{height:56}}>Atualizar Gráfico</Button>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: 400,
                            position: "relative",
                        }}
                    >
                        {chartType === "bar" && <BarChart data={barChartData} />}
                        {chartType === "pie" && <PieChart data={pieChartData} />}
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
                            label="Ano de Início"
                            type="number"
                            value={startDate}
                            onChange={(event) =>
                                handleDateChange(event, "start")
                            }
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: 1900, max: 2100 }}
                        />
                        <TextField
                            label="Ano de Fim"
                            type="number"
                            value={endDate}
                            onChange={(event) => handleDateChange(event, "end")}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: 1900, max: 2100 }}
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
