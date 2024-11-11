import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import dayjs from "dayjs";

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
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
            <div className="p-4 bg-gray-200 flex flex-row gap-6 w-full h-full">
                <Sidebar />
                <div className="flex flex-col w-full gap-4">
                    <Navbar />
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl">
                        <div className="flex flex-col justify-center items-center mt-4 mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 ">
                                {book.title}
                            </h1>
                            <h2 className="text-lg text-gray-500">
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
                                <div className="bg-green-200/80 p-6 rounded-xl h-full">
                                    <strong>Descrição:</strong>{" "}
                                    <div dangerouslySetInnerHTML={{
            __html: book.description || "<p>Não disponível</p>",
        }}></div>
                                </div>
                            </div>
                            <div className="flex flex-row bg-green-200/80 p-6 rounded-xl gap-8">
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Autores</strong>{" "}
                                        {book.authors || "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl" >Gênero</strong>{" "}
                                        {book.genre || "Desconhecido"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Avaliação</strong>{" "}
                                        {book.rating || "Não avaliado"}
                                    </p>
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Editora</strong>{" "}
                                        {book.publisher || "Desconhecido"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Idioma</strong>{" "}
                                        {book.language || "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Páginas</strong>{" "}
                                        {book.pageCount || "Não especificado"}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Data de Publicação</strong>{" "}
                                        {book.publishedDate ? dayjs(book.publishedDate).format("DD/MM/YYYY") : "Desconhecido"}
                                    </p>
                                    <p>
                                        <strong className="bg-green-500 text-white p-1 rounded-xl">Preço</strong>{" "}
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
