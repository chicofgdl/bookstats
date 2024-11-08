import React from "react";
import noImageAvailable from "../../assets/noImageAvailable.jpg";
import Rating from "@mui/material/Rating";

export default function BookCard({ title, author, genre, rating, coverImage }) {
    return (
        <div className="px-4 py-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center relative hover:bg-gray-100 transition">
            <div className="absolute top-2 right-2">
                <Rating value={rating} precision={0.5} size="small" readOnly />
            </div>
            <img
                src={coverImage || noImageAvailable}
                alt={`Capa do livro ${title}`}
                className="w-40 h-60 object-cover rounded-md mb-4 mt-2"
            />
            <div>
                <h2 className="text-base font-semibold text-gray-800">
                    {title}
                </h2>
                <p className="text-sm text-gray-600">{author}</p>
                <p className="text-sm text-gray-400">{genre}</p>
            </div>
        </div>
    );
}
