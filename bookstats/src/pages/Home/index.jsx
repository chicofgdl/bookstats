import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import BookCard from "../../components/BookCard";
import Sidebar from "../../components/Sidebar";
import { Box, IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [books, setBooks] = useState([]);
    const { searchTerm } = useContext(SearchContext);

    const navigate = useNavigate();

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    // Função para buscar livros na Google Books API
    useEffect(() => {
        // Define o valor do termo de busca como "*" caso esteja vazio
        const query = searchTerm || "*";

        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
                );
                const booksData = response.data.items.map((item) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors
                        ? item.volumeInfo.authors.join(", ")
                        : "Autor desconhecido",
                    genre: item.volumeInfo.categories
                        ? item.volumeInfo.categories[0]
                        : "Gênero desconhecido",
                    rating: item.volumeInfo.averageRating || "Sem avaliação",
                    coverImage: item.volumeInfo.imageLinks?.thumbnail || null,
                }));
                setBooks(booksData);
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        };

        fetchBooks();
    }, [searchTerm]); // Executa fetchBooks sempre que searchTerm mudar

    // Função para rolar para o topo
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="p-4 bg-gray-200 flex flex-row gap-6 w-full h-full">
            <Sidebar />
            <div className="flex flex-col w-full gap-4">
                <Navbar />
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-8">
                        Bem-vindo ao BookStats
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-4">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                author={book.authors}
                                genre={book.genre}
                                rating={book.rating}
                                coverImage={book.coverImage}
                                onClick={() => handleBookClick(book.id)}
                            />
                        ))}
                    </div>
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
