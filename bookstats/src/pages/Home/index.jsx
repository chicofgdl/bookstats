import React from "react";
import Navbar from "../../components/Navbar";
import BookCard from "../../components/BookCard";
import Sidebar from "../../components/Sidebar";
import { Box, IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

export default function Home() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="p-4 bg-gray-200 flex flex-row gap-6 w-full h-full">
            <Sidebar />
            <div className="flex flex-col w-full gap-4">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-8 ">
                        Bem-vindo ao BookStats
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 border-t-2 py-8">
                        <BookCard title="Livro 1" description="dados livro 1" />
                        <BookCard title="Livro 2" description="dados livro 2" />
                        <BookCard title="Livro 3" description="dados livro 3" />
                        <BookCard title="Livro 4" description="dados livro 4" />
                        <BookCard title="Livro 5" description="dados livro 5" />
                        <BookCard title="Livro 6" description="dados livro 6" />
                        <BookCard title="Livro 7" description="dados livro 7" />
                        <BookCard title="Livro 8" description="dados livro 8" />
                        <BookCard title="Livro 9" description="dados livro 9" />
                    </div>
                    {/* Botão fixo para rolar até o topo */}
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: 60,
                            right: 80,
                            zIndex: 1000,
                        }}
                    >
                        <IconButton
                            onClick={scrollToTop}
                            style={{
                                color: "white",
                                backgroundColor: "#22c55e",
                                borderRadius: "50%",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <ArrowUpward />
                        </IconButton>
                    </Box>
                </div>
            </div>
        </div>
    );
}
