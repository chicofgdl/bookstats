import React, {useContext} from "react";
import noImageAvailable from "../../assets/noImageAvailable.jpg";
import Rating from "@mui/material/Rating";
import { ThemeContext } from "../../context/ThemeContext";

export default function BookCard({ title, author, genre, rating, coverImage, onClick }) {

    const { darkMode } = useContext(ThemeContext);

    return (
        <div onClick={onClick} className={`px-4 py-6 ${darkMode ? "bg-gray-500":"bg-white"} rounded-lg shadow-md flex flex-col items-center justify-center relative ${darkMode ? "hover:bg-gray-500/50":"hover:bg-gray-100"} transition`}>
            <div className="absolute top-2 right-2">
                <Rating value={rating} precision={0.5} size="small" readOnly />
            </div>
            <img
                src={coverImage || noImageAvailable}
                alt={`Capa do livro ${title}`}
                className="w-40 h-60 object-cover rounded-md mb-4 mt-2"
            />
            <div className="flex flex-col gap-2 w-full justify-center items-center">
                <h2 className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {title}
                </h2>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{author}</p>
                <p className={`text-sm ${darkMode ? "text-white" : "text-gray-400"}`}>{genre}</p>
            </div>
        </div>
    );
}
