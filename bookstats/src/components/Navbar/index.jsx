import React from "react";
import { Link } from "react-router-dom";
import AutocompleteSearch from "../AutocompleteSearch";


export default function Navbar() {
    return (
        <nav className="bg-green-500 py-6 px-12 rounded-2xl">
            <div className="container mx-auto flex justify-between">                
                <AutocompleteSearch />
                <div className="flex flex-row justify-center items-center space-x-8">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-white hover:underline">
                            1
                        </Link>
                        <p className="text-gray-100">|</p>
                        <Link to="/" className="text-white hover:underline">
                            2
                        </Link>
                        <p className="text-gray-100">|</p>
                        <Link to="/" className="text-white hover:underline">
                            3
                        </Link>
                    </div>
                    <p className="text-white text-xl">Modo noturno</p>
                </div>
            </div>
        </nav>
    );
}
