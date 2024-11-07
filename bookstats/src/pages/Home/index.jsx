import React from "react";
import Navbar from "../../components/Navbar";
import BookCard from "../../components/BookCard";

export default function Home() {
    return (
        <div className="p-6  bg-gray-200 flex flex-col gap-4">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen pt-10 bg-gray-50 rounded-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-10">
                    Bem-vindo ao BookStats
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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
            </div>
        </div>
    );
}
