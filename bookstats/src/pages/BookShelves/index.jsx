import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { ThemeContext } from "../../context/ThemeContext";
import noImageAvailable from "../../assets/noImageAvailable.jpg";

export default function Bookshelves() {
    const [bookshelves, setBookshelves] = useState([]);
    const { darkMode } = useContext(ThemeContext);

    const fetchBookshelves = async () => {
        // const token = localStorage.getItem("authToken");

        // if (!token) {
        //     console.error("Token não encontrado. Faça login novamente.");
        //     return;
        // } else { console.log("Token encontrado:", token); }

        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );

            // Log da resposta das estantes
            console.log("Resposta das estantes:", response.data.items);

            const shelvesData = await Promise.all(
                response.data.items
                    .filter((shelf) => shelf.id >= 0 && shelf.id <= 3)  // Filtra estantes de id 0 a 3
                    .map(async (shelf) => {
                        try {
                            const booksResponse = await axios.get(
                                `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf.id}/volumes`,
                                { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
                            );
    
                            console.log(`Livros da estante ${shelf.title}:`, booksResponse.data.items);
    
                            return { ...shelf, books: booksResponse.data.items || [] };
                        } catch (error) {
                            console.error(`Erro ao buscar livros da estante ${shelf.title}:`, error);
                            return { ...shelf, books: [] };
                        }
                    })
            );

            setBookshelves(shelvesData);
            // Log para verificar se o estado foi atualizado
            console.log("Dados das estantes com livros:", shelvesData);
        } catch (error) {
            console.error("Erro ao buscar estantes:", error);
        }
    };

    useEffect(() => {
        fetchBookshelves();
    }, []);

    return (
        <div
            className={`p-4 ${
                darkMode ? "bg-gray-900" : "bg-gray-200"
            } flex flex-row gap-6 w-full h-full`}
        >
            <Sidebar />
            <div className="flex flex-col w-full gap-4">
                <Navbar />
                <div
                    className={`flex flex-col p-6 ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                    } rounded-2xl shadow-md`}
                >
                    <h1
                        className={`text-2xl font-bold mb-4 ${
                            darkMode ? "text-white" : "text-black"
                        }`}
                    >
                        Minhas Estantes
                    </h1>

                    {/* Botão para recarregar as estantes */}
                    <button
                        onClick={fetchBookshelves}
                        className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
                    >
                        Recarregar Estantes
                    </button>

                    {bookshelves.map((shelf) => (
                        <div key={shelf.id} className={`mb-6 ${darkMode ? "bg-gray-700" : "bg-gray-200"} px-6 py-8 rounded-xl`}>
                            <h2 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                {shelf.title}
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {shelf.books && shelf.books.length > 0 ? (
                                    shelf.books.map((book) => (
                                        <div
                                            key={book.id}
                                            className="w-32 h-48"
                                        >
                                            <img
                                                src={
                                                    book.volumeInfo.imageLinks
                                                        ?.thumbnail ||
                                                    noImageAvailable
                                                }
                                                alt={book.volumeInfo.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <p className={`text-sm mt-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                                {book.volumeInfo.title}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Estante vazia</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
