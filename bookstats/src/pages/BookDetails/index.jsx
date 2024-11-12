import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import dayjs from "dayjs";
import { ThemeContext } from "../../context/ThemeContext";

export default function BookDetails() {
    const { darkMode } = useContext(ThemeContext);
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [selectedShelf, setSelectedShelf] = useState("");

    const addToShelf = async (shelfId) => {
        try {
            await axios.post(
                `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/addVolume?volumeId=${id}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            alert("Livro adicionado com sucesso!");
            // fetchBookshelves();
        } catch (error) {
            console.error("Erro ao adicionar livro à estante:", error);
        }
    };

    const removeFromShelf = async (shelfId) => {
        try {
            await axios.post(
                `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${id}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            alert("Livro removido com sucesso!");
            // fetchBookshelves();
        } catch (error) {
            console.error("Erro ao remover livro da estante:", error);
        }
    };

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes/${id}?
`
                );
                const volumeInfo = response.data.volumeInfo;
                setBook({
                    title: volumeInfo.title || "Título não disponível",
                    authors: volumeInfo.authors
                        ? volumeInfo.authors.join(", ")
                        : null,
                    genre: volumeInfo.categories
                        ? volumeInfo.categories[0]
                        : null,
                    rating: volumeInfo.averageRating || null,
                    coverImage:
                        volumeInfo.imageLinks?.extraLarge ||
                        volumeInfo.imageLinks?.thumbnail ||
                        null,
                    publisher: volumeInfo.publisher || null,
                    publishedDate: volumeInfo.publishedDate || null,
                    description: volumeInfo.description || null,
                    pageCount: volumeInfo.pageCount || null,
                    language: volumeInfo.language || null,
                    price: response.data.saleInfo.listPrice
                        ? `${response.data.saleInfo.listPrice.amount} ${response.data.saleInfo.listPrice.currencyCode}`
                        : null,
                });
            } catch (error) {
                console.error("Erro ao buscar dados do livro:", error);
            }
        };
        fetchBookDetails();
    }, [id]);

    if (!book) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div
                className={`p-4 ${
                    darkMode ? "bg-gray-900" : "bg-gray-200"
                } flex flex-row gap-6 w-full h-full`}
            >
                <Sidebar />
                <div className="flex flex-col w-full gap-4">
                    <Navbar />
                    <div
                        className={`flex flex-col items-center justify-center p-8 ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                        } rounded-2xl`}
                    >
                        <div className="flex flex-col justify-center items-center mt-4 mb-8">
                            <h1
                                className={`text-3xl font-bold ${
                                    darkMode ? "text-white" : "text-gray-800"
                                }`}
                            >
                                {book.title}
                            </h1>
                            <h2
                                className={`text-lg ${
                                    darkMode ? "text-gray-300" : "text-gray-500"
                                }`}
                            >
                                {book.authors}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-8 p-4 ">
                            <div className="flex flex-row gap-8 items-center justify-center">
                                <img
                                    className="w-72 rounded-xl"
                                    src={book.coverImage}
                                    alt={book.title}
                                />
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-gray-500"
                                            : "bg-green-200/80"
                                    } p-6 rounded-xl h-full`}
                                >
                                    <strong>Descrição:</strong>{" "}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                book.description ||
                                                "<p>Não disponível</p>",
                                        }}
                                    ></div>
                                    <div className="flex flex-row p-2 gap-6">
                                        <select
                                            className={`${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-700"
                                            } p-2 rounded-xl text-white`}
                                            onChange={(e) =>
                                                setSelectedShelf(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Escolha estante
                                            </option>
                                            <option value="0">Favoritos</option>
                                            <option value="1">
                                                Lendo no momento
                                            </option>
                                            <option value="2">Vou ler</option>
                                            <option value="3">Lidos</option>
                                        </select>
                                        <button
                                            onClick={() =>
                                                addToShelf(selectedShelf)
                                            }
                                            disabled={!selectedShelf}
                                            className={`${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-700"
                                            } p-2 rounded-xl text-white`}
                                        >
                                            Adicionar
                                        </button>
                                        <button
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-green-700"
                                        } p-2 rounded-xl text-white`}
                                            onClick={() =>
                                                removeFromShelf(selectedShelf)
                                            }
                                            disabled={!selectedShelf}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`flex flex-row ${
                                    darkMode ? "bg-gray-500" : "bg-green-200/80"
                                } p-6 rounded-xl gap-8`}
                            >
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Autores
                                        </strong>{" "}
                                        {book.authors || "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Gênero
                                        </strong>{" "}
                                        {book.genre || "Desconhecido"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Avaliação
                                        </strong>{" "}
                                        {book.rating || "Não avaliado"}
                                    </p>
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Editora
                                        </strong>{" "}
                                        {book.publisher || "Desconhecido"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Idioma
                                        </strong>{" "}
                                        {book.language || "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Páginas
                                        </strong>{" "}
                                        {book.pageCount || "Não especificado"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Data de Publicação
                                        </strong>{" "}
                                        {book.publishedDate
                                            ? dayjs(book.publishedDate).format(
                                                  "DD/MM/YYYY"
                                              )
                                            : "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong
                                            className={` ${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-green-500"
                                            } text-white p-1 rounded-xl`}
                                        >
                                            Preço
                                        </strong>{" "}
                                        {book.price || "Não disponível"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
