import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { ThemeContext } from "../../context/ThemeContext";

export default function Bookshelves() {
    const [bookshelves, setBookshelves] = useState([]);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
                );

                const shelvesData = await Promise.all(
                    response.data.items.map(async (shelf) => {
                        const booksResponse = await axios.get(
                            `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelf.id}/volumes`,
                            { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
                        );
                        return { ...shelf, books: booksResponse.data.items || [] };
                    })
                );
                setBookshelves(shelvesData);
            } catch (error) {
                console.error("Erro ao buscar estantes:", error);
            }
        };

        fetchBookshelves();
    }, []);

    return (
        <div className={`p-4 ${darkMode ? "bg-gray-900" : "bg-gray-200"} flex flex-row gap-6 w-full h-full`}>
            <Sidebar />
            <div className="flex flex-col w-full gap-4">
                <Navbar />
                <div className={`flex flex-col p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"} rounded-2xl shadow-md m-8`}>
                    <h1 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>Minhas Estantes</h1>
                    {bookshelves.map((shelf) => (
                        <div key={shelf.id} className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">{shelf.title}</h2>
                            <div className="flex flex-wrap gap-4">
                                {shelf.books.length > 0 ? (
                                    shelf.books.map((book) => (
                                        <div key={book.id} className="w-32 h-48">
                                            <img src={book.volumeInfo.imageLinks?.thumbnail || "path/to/default.jpg"} alt={book.volumeInfo.title} />
                                            <p>{book.volumeInfo.title}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Estante vazia</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
