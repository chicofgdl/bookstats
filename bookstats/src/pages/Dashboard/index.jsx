// src/pages/Dashboard/index.jsx

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";
import LineChart from "../../components/Charts/LineChart";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

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

const lineData = [
    {
        id: "Romance",
        data: [
            { x: "2020", y: 350 },
            { x: "2021", y: 100 },
            { x: "2022", y: 150 },
            { x: "2023", y: 200 },
        ],
    },
    {
        id: "Terror",
        data: [
            { x: "2020", y: 150 },
            { x: "2021", y: 200 },
            { x: "2022", y: 250 },
            { x: "2023", y: 300 },
        ],
    },
    {
        id: "Aventura",
        data: [
            { x: "2020", y: 250 },
            { x: "2021", y: 250 },
            { x: "2022", y: 150 },
            { x: "2023", y: 100 },
        ],
    },
];

export default function Dashboard() {
    const [chartType, setChartType] = useState("bar"); // Estado para controlar o tipo de gráfico da análise de Distribuições por gênero

    // Função para atualizar o tipo de gráfico
    const handleChange = (event) => {
        setChartType(event.target.value);
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
                    <Box
                        sx={{
                            width: "100%",
                            height: 400,
                            position: "relative",
                        }}
                    >
                        <LineChart data={lineData} />
                    </Box>
                </div>
            </div>
        </div>
    );
}
