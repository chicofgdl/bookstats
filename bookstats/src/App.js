import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <SearchProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/books/:id" element={<BookDetails />} />
                    </Routes>
                </SearchProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
